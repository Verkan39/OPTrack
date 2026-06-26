from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Applications


class ApplicationAPISecurityTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(
            username="user1",
            password="testpass123",
        )
        self.user2 = User.objects.create_user(
            username="user2",
            password="testpass123",
        )

        self.app1 = Applications.objects.create(
            user=self.user1,
            company="Google",
            role="Software Engineering Intern",
            platform="linkedin",
            status="applied",
            location="Remote",
            salary="Not disclosed",
            application_link="https://example.com/google",
        )

        self.app2 = Applications.objects.create(
            user=self.user2,
            company="Stripe",
            role="Backend Intern",
            platform="wellfound",
            status="interview",
            location="Remote",
            salary="Not disclosed",
            application_link="https://example.com/stripe",
        )

    def test_logged_out_user_cannot_access_apps_api(self):
        response = self.client.get("/api/applications/")

        self.assertIn(
            response.status_code,
            [status.HTTP_401_UNAUTHORIZED, status.HTTP_403_FORBIDDEN],
        )

    def test_user_sees_only_own_applications(self):
        self.client.login(username="user1", password="testpass123")

        response = self.client.get("/api/applications/")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["company"], "Google")

    def test_user_cannot_access_other_users_application_detail(self):
        self.client.login(username="user1", password="testpass123")

        response = self.client.get(f"/api/applications/{self.app2.id}/")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_user_cannot_delete_other_users_application(self):
        self.client.login(username="user1", password="testpass123")

        response = self.client.delete(f"/api/applications/{self.app2.id}/")

        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertTrue(Applications.objects.filter(id=self.app2.id).exists())

    def test_application_created_with_logged_in_user(self):
        self.client.login(username="user1", password="testpass123")

        payload = {
            "company": "Microsoft",
            "role": "Frontend Intern",
            "platform": "linkedin",
            "status": "wishlist",
            "location": "Bangalore",
            "salary": "Not disclosed",
            "application_link": "https://example.com/microsoft",
            "resume_version": "SDE Resume v1",
            "notes": "Applied from React frontend later.",
        }

        response = self.client.post("/api/applications/", payload, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        created_application = Applications.objects.get(company="Microsoft")

        self.assertEqual(created_application.user, self.user1)
        self.assertEqual(created_application.role, "Frontend Intern")