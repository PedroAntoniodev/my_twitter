from django.contrib.auth.models import User
from django.db import models

# Create your models here.

def profile_image_path(instance, filename):
    return f'profiles/{instance.user_id}/{filename}'

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    display_name = models.CharField(max_length=50, blank=True)
    avatar = models.ImageField(upload_to=profile_image_path, blank=True, null=True)
    bio = models.TextField(max_length=500, blank=True)
    

    def __str__(self):
        return self.user.username


class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name='following')  
    following = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('follower', 'following') 