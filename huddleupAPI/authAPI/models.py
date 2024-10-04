import os
import uuid
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractUser


def user_avatar_upload(self, filename):
    extension = filename.split('.')[-1]
    filename = 'user_{}.{}'.format(self.id, extension)
    return os.path.join('avatars/', filename)


class User(AbstractUser):
    username = models.CharField(max_length=255, unique=True, blank=True)
    about_me = models.TextField(blank=True, default="")
    avatar = models.ImageField(upload_to=user_avatar_upload, blank=True, null=True)

    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


class Session(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    expiresAt = models.DateTimeField()
