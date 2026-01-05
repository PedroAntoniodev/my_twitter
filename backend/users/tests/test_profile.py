import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from users.models import Profile

@pytest.mark.django_db
def test_profile_detail_success():
    user = User.objects.create_user(username="paulo", password="123456")
    profile = user.profile
    profile.display_name = "Paulo Silva"
    profile.bio = "Desenvolvedor Python"
    profile.save()

    client = APIClient()
    client.force_authenticate(user=user)

    response = client.get(f"/api/profile/{user.username}/")
    assert response.status_code == 200
    data = response.json()
    assert data["display_name"] == "Paulo Silva"
    assert data["bio"] == "Desenvolvedor Python"

@pytest.mark.django_db
def test_profile_detail_not_found():
    user = User.objects.create_user(username="paulo", password="123456")
    client = APIClient()
    client.force_authenticate(user=user)
    response = client.get("/api/profile/inexistente/")
    assert response.status_code == 404
