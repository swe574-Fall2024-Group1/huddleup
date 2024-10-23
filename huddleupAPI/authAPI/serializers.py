from rest_framework import serializers, exceptions
from .models import User, Session


class UserSerializer(serializers.ModelSerializer):

	def validate_username(self, value):
		if User.objects.filter(username=value).exists():
			raise exceptions.ValidationError("User with this username already exists")
		return value

	class Meta:
		model = User
		fields = ['username', 'password', 'id']

class SessionSerializer(serializers.ModelSerializer):

	class Meta:
		model = Session
		fields = ['userId', 'expiresAt', 'id']