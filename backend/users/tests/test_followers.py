import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from users.models import Follow

@pytest.mark.django_db
def test_list_followers_and_following():
    alice = User.objects.create_user(username="alice", password="123456")
    bob = User.objects.create_user(username="bob", password="123456")
    carol = User.objects.create_user(username="carol", password="123456")

    Follow.objects.create(follower=alice, following=bob)
    Follow.objects.create(follower=carol, following=bob)

    client = APIClient()
    client.force_authenticate(user=alice)

    # Followers de bob
    response = client.get(f"/api/followers/{bob.username}/")
    assert response.status_code == 200
    data = response.json()
    assert "followers" in data
    assert "alice" in data["followers"]
    assert "carol" in data["followers"]

    # Following de alice
    response = client.get(f"/api/following/{alice.username}/")
    assert response.status_code == 200
    data = response.json()
    assert "following" in data
    assert "bob" in data["following"]
