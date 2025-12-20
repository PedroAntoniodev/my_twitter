from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from .models import Profile, Follow
from .serializers import ProfileSerializer, RegisterSerializer, UserSerializer



# Create your views here.

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class MeView(APIView):
    def get(self, request):
        return Response(UserSerializer(request.user).data)
    
class ProfileDetailView(APIView):
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        return Response(ProfileSerializer(user.profile).data)

class ProfileUpdateView(APIView):
    def put(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class FollowToggleView(APIView):
    def post(self, request, username):
        target = get_object_or_404(User, username=username)
        if target == request.user:
            return Response({'datail': 'Você não pode seguir a si mesmo.' }, status=400)
        obj, created = Follow.objects.get_or_create(follower=request.user, following=target)
        if not created:
            obj.delete()
            return Response({'following': False})
        return Response({'following': True})

class FollowingListView(APIView):
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        followings = user.following.all().values_list('following__username', flat=True)
        return Response({'following': list(followings)})

class FollowersListView(APIView):
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        followers = user.followers.all().values_list('follower__username', flat=True)
        return Response({'followers': list(followers)})
    
