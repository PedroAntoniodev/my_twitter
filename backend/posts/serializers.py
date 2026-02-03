from rest_framework import serializers
from .models import Post, Comment

class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    total_likes = serializers.SerializerMethodField()
    liked_by_me = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ['id', 'author', 'content', 'created_at', 'updated_at', 'total_likes', 'total_comments', 'liked_by_me']
        read_only_fields = ['liked_by_me', 'total_likes', 'total_comments', 'author', 'created_at', 'updated_at']

    def get_total_likes(self, obj):
        return obj.total_likes()
    
    def get_total_comments(self, obj):
        return obj.total_comments()
    

    def get_liked_by_me(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return obj.likes.filter(id=user.id).exists()
        return False
class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'content', 'created_at', 'updated_at']
        read_only_fields = ['post', 'author', 'created_at', 'updated_at']