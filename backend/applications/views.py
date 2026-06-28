from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from django.middleware.csrf import get_token
from rest_framework import generics, viewsets
from .serializers import ApplicationSerializer, UserProfileSerializer
from .forms import ApplicationForm
from .models import Applications, UserProfile
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import authenticate, login, logout, get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()


@ensure_csrf_cookie
@api_view(["GET"])
@permission_classes([AllowAny])
def csrf_cookie(request):
    return Response({"csrfToken": get_token(request)})


@api_view(["POST"])
@permission_classes([AllowAny])
def signup_view(request):
    username = request.data.get("username", "").strip()
    email = request.data.get("email", "").strip()
    password = request.data.get("password", "")

    if not username or not email or not password:
        return Response(
            {"detail": "Username, email and password are required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"detail": "Username already exists."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"detail": "Email already exists."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
    )

    UserProfile.objects.get_or_create(user=user)

    login(request, user)

    return Response(
        {
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }
        },
        status=status.HTTP_201_CREATED,
    )


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get("username", "").strip()
    password = request.data.get("password", "")

    user = authenticate(request, username=username, password=password)

    if user is None:
        return Response(
            {"detail": "Invalid username or password."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    login(request, user)

    return Response(
        {
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }
        }
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return Response({"detail": "Logged out successfully."})


@api_view(["GET"])
@permission_classes([AllowAny])
def me_view(request):
    if not request.user.is_authenticated:
        return Response({"user": None})

    user = request.user

    return Response(
        {
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            }
        }
    )


@login_required
def application_list(request):
    applications = Applications.objects.filter(user=request.user).order_by("-id")

    return render(
        request,
        "applications/application_list.html",
        {
            "applications": applications,
        },
    )


@login_required
def application_create(request):
    if request.method == "POST":
        form = ApplicationForm(request.POST)

        if form.is_valid():
            application = form.save(commit=False)
            application.user = request.user
            application.save()
            return redirect("application_list")
    else:
        form = ApplicationForm()

    return render(
        request,
        "applications/application_form.html",
        {
            "form": form,
            "title": "Add Application",
        },
    )


@login_required
def application_update(request, pk):
    applicaton = get_object_or_404(Applications, pk=pk, user=request.user)

    if request.method == "POST":
        form = ApplicationForm(request.POST, instance=applicaton)

        if form.is_valid():
            form.save()
            return redirect("application_list")
    else:
        form = ApplicationForm(instance=applicaton)

    return render(
        request,
        "applications/application_form.html",
        {
            "form": form,
            "title": "Edit Application",
        },
    )


@login_required
def application_delete(request, pk):
    application = get_object_or_404(Applications, pk=pk, user=request.user)

    if request.method == "POST":
        application.delete()
        return redirect("application_list")

    return render(
        request,
        "applications/application_confirm_delete.html",
        {
            "application": application,
        },
    )


class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Applications.objects.filter(user=self.request.user).order_by("-id")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile, _ = UserProfile.objects.get_or_create(
            user=self.request.user,
            defaults={
                "name": self.request.user.get_full_name() or self.request.user.username,
                "email": self.request.user.email,
            },
        )
        return profile