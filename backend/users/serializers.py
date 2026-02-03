from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Follow

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ProfileSerializer(serializers.ModelSerializer):
    followed_by_me = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = [ 'display_name', 'avatar', 'bio', 'followed_by_me']
        read_only_fields = ['followed_by_me']

    def get_followed_by_me(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return Follow.objects.filter(follower=user, following=obj.user).exists()
        return False

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )