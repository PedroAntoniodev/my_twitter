import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from posts.models import Post

@pytest.mark.django_db
def test_list_posts_empty_returns_empty_list():
    client = APIClient()

    response = client.get("/api/posts/")

    assert response.status_code == 200
    data = response.json()

    assert data["count"] == 0
    assert data["results"] == []
    assert data["next"] is None
    assert data["previous"] is None


@pytest.mark.django_db
def test_list_posts_pagination():
    user = User.objects.create_user(username="Pedro", password="123456")
    for i in range(15):
        Post.objects.create(author=user, content=f"Post {i}")

    client = APIClient()
    response = client.get("/api/posts/")
    data = response.json()

    assert data["count"] == 15
    assert len(data["results"]) == 10
    assert data["next"] is not None