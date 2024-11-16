from rest_framework import serializers
from .models import Community, CommunityUserConnection, Template, Post, Comment, PostLike, CommentLike, CommunityInvitation, UserFollowConnection
from taggit.serializers import (TagListSerializerField,
                                TaggitSerializer)
from taggit.models import Tag

from .models import Community, CommunityUserConnection, Template, Post, Comment, PostLike, CommentLike, \
	CommunityInvitation, UserFollowConnection, Badge, UserBadge


class CommunitySerializer(serializers.ModelSerializer):

	class Meta:
		model = Community
		fields = ['name', 'description', 'mainImage', 'isPrivate', 'id', 'createdAt']

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
		fields = ['createdBy', 'community', 'templateName', 'rows', 'id', 'createdAt', 'isDeleted']


class PostSerializer(TaggitSerializer, serializers.ModelSerializer):
	tags = TagListSerializerField(required=False)

	class Meta:
		model = Post
		fields = ['createdBy', 'community', 'template', 'rowValues', 'id', 'createdAt', 'isEdited', 'tags']

class CommentSerializer(serializers.ModelSerializer):

	class Meta:
		model = Comment
		fields = ['createdBy', 'post', 'comment', 'id', 'createdAt', 'isEdited']


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

class BadgeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Badge
		fields = '__all__'

class UserBadgeSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserBadge
		fields = '__all__'
