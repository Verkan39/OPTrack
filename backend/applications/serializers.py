from rest_framework import serializers
from .models import Applications, UserProfile


class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applications
        fields = [
            "id",
            "company",
            "role",
            "platform",
            "status",
            "location",
            "salary",
            "application_link",
            "resume_version",
            "notes",
            "applied_date",
            "deadline",
            "next_follow_up",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            "id",
            "username",
            "name",
            "headline",
            "email",
            "location",
            "target_role",
            "preferred_platforms",
            "bio",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "username", "created_at", "updated_at"]