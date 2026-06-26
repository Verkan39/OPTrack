from django import forms
from .models import Applications


class ApplicationForm(forms.ModelForm):
    class Meta:
        model = Applications
        fields = [
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
        ]

        widgets = {
            "company": forms.TextInput(attrs={"class": "form-control"}),
            "role": forms.TextInput(attrs={"class": "form-control"}),
            "platform": forms.Select(attrs={"class": "form-control"}),
            "status": forms.Select(attrs={"class": "form-control"}),
            "location": forms.TextInput(attrs={"class": "form-control"}),
            "salary": forms.TextInput(attrs={"class": "form-control"}),
            "application_link": forms.URLInput(attrs={"class": "form-control"}),
            "resume_version": forms.TextInput(attrs={"class": "form-control"}),
            "notes": forms.Textarea(attrs={"class": "form-control", "rows": 4}),
            "applied_date": forms.DateInput(
                attrs={"class": "form-control", "type": "date"}
            ),
            "deadline": forms.DateInput(
                attrs={"class": "form-control", "type": "date"}
            ),
            "next_follow_up": forms.DateInput(
                attrs={"class": "form-control", "type": "date"}
            ),
        }