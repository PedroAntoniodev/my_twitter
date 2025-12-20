from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from django.db.models import Q
from django.shortcuts import get_object_or_404
from .models import Post, Comment
from users.models import Follow
from .serializers import PostSerializer, CommentSerializer

# Create your views here.

class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PostDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
        # Verificar se o usuário é o autor do post para poder editar
        if self.request.user != serializer.instance.author:
            raise PermissionDenied("Você não pode editar o post de outro usuário.")
        serializer.save()

    def perform_destroy(self, instance):
        if self.request.user != instance.author:
            raise PermissionDenied("Você não pode excluir o post de outro usuário.")
        instance.delete()


class LikeToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        post = get_object_or_404(Post, pk=pk)
        user = request.user

        if user in post.likes.all():
            post.likes.remove(user)
            return Response({'liked': False, 'total_likes': post.total_likes()})
        else:
            post.likes.add(user)
            return Response({'liked': True, 'total_likes': post.total_likes()})

class CommentListCreateView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        post_id = self.kwargs['pk']
        return Comment.objects.filter(post_id=post_id).order_by('-created_at')
    
    def perform_create(self, serializer):
        post_id = self.kwargs['pk']
        post = get_object_or_404(Post, pk=post_id)
        serializer.save(author=self.request.user, post=post)

class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
        queryset = Comment.objects.all()
        serializer_class = CommentSerializer
        permission_classes = [permissions.IsAuthenticatedOrReadOnly]

        def perform_update(self, serializer):
            # Verificar se o usuário é o autor do comentário para poder editar
            if self.request.user != serializer.instance.author:
                raise PermissionDenied("Você não pode editar o comentário de outro usuário.")
            serializer.save()

        def perform_destroy(self, instance):
            if self.request.user != instance.author:
                raise PermissionDenied("Você não pode excluir o comentário de outro usuário.")
            instance.delete()

class FeedView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        
        following_user_ids = Follow.objects.filter(
            follower=user
        ).values_list('following_id', flat=True)

        return Post.objects.filter(
            Q(author__in=following_user_ids) | Q(author=user)
        ).order_by('-created_at')