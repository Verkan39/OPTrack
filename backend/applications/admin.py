from django.contrib import admin
from .models import Applications

@admin.register(Applications)
class ApplicationAdmin(admin.ModelAdmin):
    list_display=(
        "company_name",
        "role",
        "platform",
        "status",
        "notes",
        "applied_date",
        "next_follow_up",
        "updated_at",
    )
    
    list_filter=("platform","status","applied_date")
    search_fields=("company_role","role","platform")
    readonly_fields=("created_at","updated_at")