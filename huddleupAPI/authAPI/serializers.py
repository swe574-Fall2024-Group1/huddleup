from rest_framework import serializers, exceptions
from .models import User, Session
from communityAPI.serializers import UserBadgeSerializer


class UserSerializer(serializers.ModelSerializer):
	badges = UserBadgeSerializer(source='userbadge_set', many=True)
	def validate_username(self, value):
		if User.objects.filter(username=value).exists():
			raise exceptions.ValidationError("User with this username already exists")
		return value

	class Meta:
		model = User
		# add badges of user
		fields = ['username', 'password', 'id', 'badges']

class SessionSerializer(serializers.ModelSerializer):

	class Meta:
		model = Session
		fields = ['userId', 'expiresAt', 'id']