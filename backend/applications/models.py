from django.conf import settings
from django.db import models


class Applications(models.Model):
    class Platform(models.TextChoices):
        LINKEDIN = "linkedin", "LinkedIn"
        WELLFOUND = "wellfound", "WellFound"
        INTERNSHALA = "internshala", "Internshala"
        UNSTOP = "unstop", "Unstop"
        COMPANY_WEBSITE = "company_website", "Company Website"
        REFERRAL = "referral", "Referral"
        COLD_EMAIL = "cold_email", "Cold Email"
        OTHER = "other", "Other"

    class Status(models.TextChoices):
        WISHLIST = "wishlist", "Wishlist"
        APPLIED = "applied", "Applied"
        ONLINE_ASSESSMENT = "online_assessment", "Online Assessment"
        INTERVIEW = "interview", "Interview"
        OFFER = "offer", "Offer"
        REJECTED = "rejected", "Rejected"
        GHOSTED = "ghosted", "Ghosted"
        CLOSED = "closed", "Closed"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="applications",
        null=True,
        blank=True,
    )

    company = models.CharField(max_length=100)
    role = models.CharField(max_length=150)

    platform = models.CharField(
        max_length=30,
        choices=Platform.choices,
        default=Platform.OTHER,
    )

    status = models.CharField(
        max_length=30,
        choices=Status.choices,
        default=Status.WISHLIST,
    )

    location = models.CharField(max_length=120, blank=True)
    salary = models.CharField(max_length=100, blank=True)

    application_link = models.URLField(blank=True)
    resume_version = models.CharField(max_length=120, blank=True)
    notes = models.TextField(blank=True)

    applied_date = models.DateField(null=True, blank=True)
    deadline = models.DateField(null=True, blank=True)
    next_follow_up = models.DateField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        return f"{self.role} at {self.company}"


class UserProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="profile",
    )

    name = models.CharField(max_length=120, blank=True)
    headline = models.CharField(max_length=120, default="Job Seeker Pro")
    email = models.EmailField(blank=True)
    location = models.CharField(max_length=120, blank=True)
    target_role = models.CharField(max_length=150, blank=True)
    preferred_platforms = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name or self.user.username