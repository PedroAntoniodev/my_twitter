import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from users.models import Follow

@pytest.mark.django_db
def test_follow_user_success():
    alice = User.objects.create_user(username="alice", password="123456")
    bob = User.objects.create_user(username="bob", password="123456")

    client = APIClient()
    client.force_authenticate(user=alice)

    response = client.post(f"/api/follow/{bob.username}/")
    assert response.status_code == 200
    assert Follow.objects.filter(follower=alice, following=bob).exists()

@pytest.mark.django_db
def test_follow_self_not_allowed():
    alice = User.objects.create_user(username="alice", password="123456")
    client = APIClient()
    client.force_authenticate(user=alice)

    response = client.post(f"/api/follow/{alice.username}/")
    assert response.status_code == 400
