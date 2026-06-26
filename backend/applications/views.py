from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated
from .serializers import ApplicationSerializer, UserProfileSerializer
from .forms import ApplicationForm
from .models import Applications, UserProfile
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
# Create your views here.

@ensure_csrf_cookie
def csrf_cookie(request):
    return JsonResponse({"detail": "CSRF cookie set"})

@login_required
def application_list(request):
    applications=Applications.objects.filter(user=request.user).order_by("-id")
    
    return render(request, "applications/application_list.html",{
        "applications":applications
    })
    
@login_required
def application_create(request):
    if request.method=="POST":
        form=ApplicationForm(request.POST)
        
        if form.is_valid():
            application=form.save(commit=False)
            application.user=request.user
            application.save()
            return redirect("application_list")
    else:
        form=ApplicationForm()
        
    return render(request, "applications/application_form.html",{
        "form":form,
        "title":"Add Application"
    })
    
@login_required
def application_update(request, pk):
    applicaton=get_object_or_404(Applications, pk=pk, user=request.user)
    
    if request.method=="POST":
        form=ApplicationForm(request.POST, instance=applicaton)
        
        if form.is_valid():
            form.save()
            return redirect("application_list")
    else:
        form=ApplicationForm(instance=applicaton)
    
    return render(request,"applications/application_form.html",{
        "form":form,
        "title":"Edit Application"
    })
    
@login_required
def application_delete(request, pk):
    application=get_object_or_404(Applications, pk=pk, user=request.user)
    
    if request.method == "POST":
        application.delete()
        return redirect("application_list")
    
    return render(request, "applications/application_confirm_delete.html",{
        "application":application
    })
    
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