from rest_framework import serializers, exceptions
from .models import User, Session
from communityAPI.serializers import UserBadgeSerializer
from taggit.serializers import (TagListSerializerField,
                                TaggitSerializer)


class RegisterUserSerializer(serializers.ModelSerializer):
	def validate_username(self, value):
		if User.objects.filter(username=value).exists():
			raise exceptions.ValidationError("User with this username already exists")
		return value

	class Meta:
		model = User
		fields = ['username', 'password', 'id']


class UserSerializer(serializers.ModelSerializer):
	badges = UserBadgeSerializer(source='userbadge_set', many=True)
	birthday = serializers.SerializerMethodField()

	class Meta:
		model = User
		fields = ['username', 'password', 'id', 'badges', 'name', 'surname', 'birthday', 'profile_picture']

	def get_birthday(self, obj):
		return obj.birthday.strftime('%Y-%m-%d') if obj.birthday else None

class SessionSerializer(serializers.ModelSerializer):

	class Meta:
		model = Session
		fields = ['userId', 'expiresAt', 'id']

