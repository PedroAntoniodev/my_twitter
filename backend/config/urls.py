"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from users.views import (
    RegisterView,
    MeView,
    ProfileDetailView,
    ProfileUpdateView,
    FollowToggleView,
    FollowersListView,
    FollowingListView
)
from posts.views import (
    PostListCreateView, 
    PostDetailView, 
    LikeToggleView, 
    CommentListCreateView,
    CommentDetailView,
    FeedView
    )

urlpatterns = [
    path('admin/', admin.site.urls),

    # Authenticação
    path('api/auth/register/', RegisterView.as_view()),
    path('api/auth/login/', TokenObtainPairView.as_view()),
    path('api/auth/refresh/', TokenRefreshView.as_view()),
    path('api/auth/me/', MeView.as_view()),

    # Perfil
    path('api/profile/update/', ProfileUpdateView.as_view()),
    path('api/profile/<str:username>/', ProfileDetailView.as_view()),

    # Seguidores
    path('api/follow/<str:username>/', FollowToggleView.as_view()),
    path('api/followers/<str:username>/', FollowersListView.as_view()),
    path('api/following/<str:username>/', FollowingListView.as_view()),

    # Posts
    path('api/posts/', PostListCreateView.as_view()),
    path('api/posts/<int:pk>/', PostDetailView.as_view()),
    path('api/posts/<int:pk>/like/', LikeToggleView.as_view()),
    path('api/posts/<int:pk>/comments/', CommentListCreateView.as_view()),
    path('api/posts/comments/<int:pk>/', CommentDetailView.as_view()),

    # feed
    path("api/feed/", FeedView.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
