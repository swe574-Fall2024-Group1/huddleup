from rest_framework import serializers
from .models import Community, CommunityUserConnection, Template, Post, Comment, PostLike, CommentLike, CommunityInvitation, UserFollowConnection

class CommunitySerializer(serializers.ModelSerializer):

	class Meta:
		model = Community
		fields = ['name', 'description', 'mainImage', 'isPrivate', 'id']

class CommunityUserConnectionSerializer(serializers.ModelSerializer):

	class Meta:
		model = CommunityUserConnection
		fields = ['user', 'community', 'type', 'id', 'createdAt']

class CommunityInvitationSerializer(serializers.ModelSerializer):

	class Meta:
		model = CommunityInvitation
		fields = ['user', 'community', 'id', 'createdAt']

class TemplateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Template
		fields = ['createdBy', 'community', 'templateName', 'rows', 'id', 'createdAt']


class PostSerializer(serializers.ModelSerializer):

	class Meta:
		model = Post
		fields = ['createdBy', 'community', 'template', 'rowValues', 'id', 'createdAt']

class CommentSerializer(serializers.ModelSerializer):

	class Meta:
		model = Comment
		fields = ['createdBy', 'post', 'comment', 'id', 'createdAt']


class PostLikeSerializer(serializers.ModelSerializer):

	class Meta:
		model = PostLike
		fields = ['createdBy', 'post', 'direction', 'id', 'createdAt']

class CommentLikeSerializer(serializers.ModelSerializer):

	class Meta:
		model = CommentLike
		fields = ['createdBy', 'comment', 'direction', 'id', 'createdAt']

class UserFollowConnectionSerializer(serializers.ModelSerializer):

	class Meta:
		model = UserFollowConnection
		fields = ['follower', 'followee', 'id', 'createdAt']

