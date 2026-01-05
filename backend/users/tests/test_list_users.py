import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User

@pytest.mark.django_db
def test_list_users_returns_all():
    User.objects.create_user(username="ana", email="ana@example.com", password="123456")
    User.objects.create_user(username="carlos", email="carlos@example.com", password="123456")

    client = APIClient()
    response = client.get("/api/users/")
    assert response.status_code == 200
    data = response.json()
    assert any(user["username"] == "ana" for user in data["results"])
    assert any(user["username"] == "carlos" for user in data["results"])
