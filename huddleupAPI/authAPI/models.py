from django.db import models
from django.contrib.auth.models import AbstractUser
from taggit.managers import TaggableManager


class User(AbstractUser):
	about_me = models.TextField(blank=True, default="")
	tags = TaggableManager(blank=True)


class Session(models.Model):
	userId = models.ForeignKey(User, on_delete=models.CASCADE)
	expiresAt = models.DateTimeField()
