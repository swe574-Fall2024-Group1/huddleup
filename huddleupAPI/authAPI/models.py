from django.db import models
from django.contrib.auth.models import AbstractUser
from taggit.managers import TaggableManager


class User(AbstractUser):
	about_me = models.TextField(blank=True, default="")
	profile_picture = models.CharField(max_length=5000000, blank=True, default="")
	name = models.TextField(blank=True, default="")
	surname = models.TextField(blank=True, default="")
	birthday = models.DateTimeField(null=True, blank=True)
	tags = TaggableManager(blank=True)


class Session(models.Model):
	userId = models.ForeignKey(User, on_delete=models.CASCADE)
	expiresAt = models.DateTimeField()
