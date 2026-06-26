from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApplicationViewSet, UserProfileView

router=DefaultRouter()
router.register(r"applications",ApplicationViewSet,basename="applications")

urlpatterns=[
    path("",include(router.urls)),
    path("profile/",UserProfileView.as_view(),name="profile"),
]