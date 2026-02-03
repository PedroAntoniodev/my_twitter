import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_change_password():
    user = User.objects.create_user(username="pedro", password="1234")
    client = APIClient()
    client.force_authenticate(user=user)

    response = client.post("/api/users/change-password/", {
        "old_password": "1234",
        "new_password": "abcd"
    })

    assert response.status_code == 200

    # Tentar login com nova senha
    client.logout()
    login_success = client.login(username="pedro", password="abcd")
    assert login_success is True
