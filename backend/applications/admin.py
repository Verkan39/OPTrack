from django.contrib import admin
from .models import Applications, UserProfile


@admin.register(Applications)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = [
        "company",
        "role",
        "platform",
        "status",
        "location",
        "salary",
        "user",
        "updated_at",
    ]

    list_filter = [
        "platform",
        "status",
        "created_at",
        "updated_at",
    ]

    search_fields = [
        "company",
        "role",
        "location",
        "notes",
        "user__username",
    ]

    readonly_fields = [
        "created_at",
        "updated_at",
    ]


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "name",
        "headline",
        "email",
        "location",
        "target_role",
        "updated_at",
    ]

    search_fields = [
        "user__username",
        "name",
        "email",
        "target_role",
    ]

    readonly_fields = [
        "created_at",
        "updated_at",
    ]