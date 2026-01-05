import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User

@pytest.mark.django_db
def test_me_authenticated_user():
    user = User.objects.create_user(username="maria", email="maria@example.com", password="123456")
    client = APIClient()
    client.force_authenticate(user=user)

    response = client.get("/api/auth/me/")
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "maria"

@pytest.mark.django_db
def test_me_unauthenticated_user():
    client = APIClient()
    response = client.get("/api/auth/me/")
    assert response.status_code == 401
