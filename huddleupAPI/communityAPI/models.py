from django.db import models
from djongo.models.fields import ObjectIdField

# Create your models here.
class Community(models.Model):
	name = models.CharField(max_length=50)
	description = models.CharField(max_length=50)
	mainImage = models.CharField(max_length=5000000)
	isPrivate = models.BooleanField()

class CommunityUserConnection(models.Model):
	MEMBER = 'member'
	MODERATOR = 'moderator'
	OWNER = 'owner'
	BANNED = 'banned'
	TYPE_CHOICES = [
		(MEMBER, 'Member'),
		(MODERATOR, 'Moderator'),
		(OWNER, 'Owner'),
		(BANNED, 'Banned')
	]
	user = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	community = models.ForeignKey('Community', on_delete=models.CASCADE)
	type = models.CharField(
		max_length=50,
		choices=TYPE_CHOICES
	)
	createdAt = models.DateTimeField(auto_now_add=True)

class Template(models.Model):
	createdBy = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	community = models.ForeignKey('Community', on_delete=models.CASCADE)
	templateName = models.CharField(max_length=50)
	rows = models.JSONField(default=list)
	createdAt = models.DateTimeField(auto_now_add=True)

