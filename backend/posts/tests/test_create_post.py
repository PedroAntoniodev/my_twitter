import pytest
from rest_framework.test import APIClient
from django.contrib.auth.models import User
from posts.models import Post

@pytest.mark.django_db
def test_list_posts_returns_all_posts():
    user1 = User.objects.create_user(username="Pedro", password="123456")
    user2 = User.objects.create_user(username="Laura", password="123456")

    Post.objects.create(author=user1, content="Post do Pedro")
    Post.objects.create(author=user2, content="Post da Laura")

    client = APIClient()

    response = client.get("/api/posts/")

    assert response.status_code == 200
    data = response.json()

    results = data["results"]
    assert len(results) == 2

    contents = [post["content"] for post in results]
    assert "Post do Pedro" in contents
    assert "Post da Laura" in contents

    authors = [post["author"] for post in results]
    assert "Pedro" in authors
    assert "Laura" in authors

    for post in results:
        assert "created_at" in post
        assert "updated_at" in post
        assert "total_likes" in post
        assert "total_comments" in post
