from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    ApplicationViewSet,
    UserProfileView,
    csrf_cookie,
    signup_view,
    login_view,
    logout_view,
    me_view,
)

router = DefaultRouter()
router.register(r"applications", ApplicationViewSet, basename="applications")

urlpatterns = [
    # Auth API routes
    path("auth/csrf/", csrf_cookie, name="auth-csrf"),
    path("auth/signup/", signup_view, name="auth-signup"),
    path("auth/login/", login_view, name="auth-login"),
    path("auth/logout/", logout_view, name="auth-logout"),
    path("auth/me/", me_view, name="auth-me"),

    # Existing API routes
    path("csrf/", csrf_cookie, name="csrf"),
    path("profile/", UserProfileView.as_view(), name="profile"),
    path("", include(router.urls)),
]