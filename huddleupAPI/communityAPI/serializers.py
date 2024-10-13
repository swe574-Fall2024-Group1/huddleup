from rest_framework import serializers
from .models import Community, CommunityUserConnection, Template, Post, Comment, PostLike, CommentLike, CommunityInvitation, UserFollowConnection


class CommunitySerializer(serializers.ModelSerializer):

	class Meta:
		model = Community
		fields = ['name', 'description', 'main_image', 'is_private', 'id', 'created_at', 'archived']


class CommunityUserConnectionSerializer(serializers.ModelSerializer):

	class Meta:
		model = CommunityUserConnection
		fields = ['user', 'community', 'type', 'id', 'created_at']


class CommunityInvitationSerializer(serializers.ModelSerializer):

	class Meta:
		model = CommunityInvitation
		fields = ['user', 'community', 'id', 'created_at']


class TemplateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Template
		fields = ['created_by', 'community', 'template_name', 'rows', 'id', 'created_at', 'is_deleted']


class PostSerializer(serializers.ModelSerializer):

	class Meta:
		model = Post
		fields = ['created_by', 'community', 'template', 'row_values', 'id', 'created_at', 'is_edited']


class CommentSerializer(serializers.ModelSerializer):

	class Meta:
		model = Comment
		fields = ['created_by', 'post', 'comment', 'id', 'created_at', 'is_edited']


class PostLikeSerializer(serializers.ModelSerializer):

	class Meta:
		model = PostLike
		fields = ['created_by', 'post', 'direction', 'id', 'created_at']


class CommentLikeSerializer(serializers.ModelSerializer):

	class Meta:
		model = CommentLike
		fields = ['created_by', 'comment', 'direction', 'id', 'created_at']


class UserFollowConnectionSerializer(serializers.ModelSerializer):

	class Meta:
		model = UserFollowConnection
		fields = ['follower', 'followee', 'id', 'created_at']
