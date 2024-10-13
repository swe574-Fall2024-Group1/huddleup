import os
import uuid
from django.db import models


def community_photo_upload(self, filename):
    extension = filename.split('.')[-1]
    filename = 'community_{}.{}'.format(str(uuid.uuid4()), extension)
    return os.path.join('community_photos/', filename)


class Community(models.Model):
	name = models.CharField(max_length=255, unique=True)
	description = models.TextField()
	main_image = models.ImageField(upload_to=community_photo_upload, blank=True, null=True)
	is_private = models.BooleanField()
	archived = models.BooleanField('archived', default=False)
	created_at = models.DateTimeField(auto_now_add=True)


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
	created_at = models.DateTimeField(auto_now_add=True)


class CommunityInvitation(models.Model):
	user = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	community = models.ForeignKey('Community', on_delete=models.CASCADE)
	created_at = models.DateTimeField(auto_now_add=True)


class Template(models.Model):
	created_by = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	community = models.ForeignKey('Community', on_delete=models.CASCADE)
	template_name = models.CharField(max_length=50)
	rows = models.JSONField(default=list)
	created_at = models.DateTimeField(auto_now_add=True)
	is_deleted = models.BooleanField(default=False)


class Post(models.Model):
	created_by = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	community = models.ForeignKey('Community', on_delete=models.CASCADE)
	template = models.ForeignKey('Template', on_delete=models.CASCADE)
	row_values = models.JSONField(default=list)
	created_at = models.DateTimeField(auto_now_add=True)
	is_edited = models.BooleanField(default=False)


class Comment(models.Model):
	created_by = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	post = models.ForeignKey('Post', on_delete=models.CASCADE)
	comment = models.CharField(max_length=1000)
	created_at = models.DateTimeField(auto_now_add=True)
	is_edited = models.BooleanField(default=False)


class PostLike(models.Model):
	created_by = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	post = models.ForeignKey('Post', on_delete=models.CASCADE)
	created_at = models.DateTimeField(auto_now_add=True)
	direction = models.BooleanField()


class CommentLike(models.Model):
	created_by = models.ForeignKey('authAPI.User', on_delete=models.CASCADE)
	comment = models.ForeignKey('Comment', on_delete=models.CASCADE)
	created_at = models.DateTimeField(auto_now_add=True)
	direction = models.BooleanField()


class UserFollowConnection(models.Model):
	follower = models.ForeignKey('authAPI.User', on_delete=models.CASCADE, related_name='follower')
	followee = models.ForeignKey('authAPI.User', on_delete=models.CASCADE, related_name='followee')
	created_at = models.DateTimeField(auto_now_add=True)
