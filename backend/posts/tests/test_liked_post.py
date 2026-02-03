import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from posts.models import Post

@pytest.mark.django_db
def test_liked_by_me_field():
    user = User.objects.create_user(username="pedro", password="1234")
    post = Post.objects.create(author=user, content="teste")
    client = APIClient()
    client.force_authenticate(user=user)

    # Dar like
    client.post(f"/api/posts/{post.id}/like/")

    # Buscar post atualizado
    response = client.get(f"/api/posts/{post.id}/")
    data = response.json()

    assert data["total_likes"] == 1
    assert data["liked_by_me"] is True
