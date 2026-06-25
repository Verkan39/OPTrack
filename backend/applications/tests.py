from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient

from .models import Applications

User=get_user_model()

class ApplicationAPISecurityTests(TestCase):
    def setUp(self):
        self.user1=User.objects.create_user(
            username="user1",
            password="MadOne12398"
        )
        self.user2=User.objects.create_user(
            username="user2",
            password="CompletelyGone09823"
        )
        
        self.client=APIClient()
        
        self.app1=Applications.objects.create(
            user=self.user1,
            company_name="OpenAI",
            role="SDE",
            status="applied",
        )
        
        self.app2=Applications.objects.create(
            user=self.user2,
            company_name="Antropic",
            role="RnD",
            status="applied"
        )
    
    def test_logged_out_user_cannot_access_apps_api(self):
        response=self.client.get("/api/applications/")
        self.assertEqual(response.status_code,403)
        
    def test_user_sees_only_own_applications(self):
        self.client.login(username="user1", password="MadOne12398")

        response = self.client.get("/api/applications/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["company_name"], "OpenAI")
        
    def test_application_created_with_logged_in_user(self):
        self.client.login(username="user1", password="MadOne12398")

        response = self.client.post(
            "/api/applications/",
            {
                "company_name": "Amazon",
                "role": "Frontend Intern",
                "status": "applied",
            },
            format="json",
        )
        
        self.assertEqual(response.status_code, 201)

        application = Applications.objects.get(company_name="Amazon")
        self.assertEqual(application.user, self.user1)
    
    def test_user_cannot_access_other_users_application_detail(self):
        self.client.login(username="user1", password="MadOne12398")

        response = self.client.get(f"/api/applications/{self.app2.id}/")

        self.assertEqual(response.status_code, 404)
    
    def test_user_cannot_delete_other_users_application(self):
        self.client.login(username="user1", password="MadOne12398")

        response = self.client.delete(f"/api/applications/{self.app2.id}/")

        self.assertEqual(response.status_code, 404)
        self.assertTrue(Applications.objects.filter(id=self.app2.id).exists())
# Create your tests here.
