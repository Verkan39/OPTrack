from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApplicationViewSet, UserProfileView, csrf_cookie

router=DefaultRouter()
router.register(r"applications",ApplicationViewSet,basename="applications")

urlpatterns = [
    path("csrf/", csrf_cookie, name="csrf"),
    path("", include(router.urls)),
    path("profile/", UserProfileView.as_view(), name="profile"),
]