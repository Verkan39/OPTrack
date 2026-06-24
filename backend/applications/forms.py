from django import forms
from .models import Applications

class ApplicationForm(forms.ModelForm):
    class Meta:
        model=Applications
        fields=[
            "company_name",
            "role",
            "platform",
            "status",
            "job_url",
            "notes",
            "applied_date",
            "deadline",
            "next_follow_up",
        ]
        
        widgets={
            "applied_date": forms.DateInput(attrs={"type":"date"}),
            "deadline": forms.DateInput(attrs={"type":"date"}),
            "next_follow_up": forms.DateInput(attrs={"type":"date"}),
            "notes":forms.Textarea(attrs={"rows":4}),
        }