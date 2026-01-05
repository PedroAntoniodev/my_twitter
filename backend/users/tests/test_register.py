import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User

@pytest.mark.django_db
def test_register_user_success():
    client = APIClient()
    payload = {"username": "novo_user", "email": "novo@example.com", "password": "123456"}
    response = client.post("/api/auth/register/", payload, format="json")

    assert response.status_code == 201
    data = response.json()
    assert data["username"] == "novo_user"
    assert User.objects.filter(username="novo_user").exists()

@pytest.mark.django_db
def test_register_user_duplicate_username():
    User.objects.create_user(username="joao", email="joao@example.com", password="123456")
    client = APIClient()
    payload = {"username": "joao", "email": "joao2@example.com", "password": "123456"}
    response = client.post("/api/auth/register/", payload, format="json")

    assert response.status_code == 400
