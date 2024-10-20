from rest_framework import serializers
from .models import User, Session


class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ['username', 'password', 'id']

class SessionSerializer(serializers.ModelSerializer):

	class Meta:
		model = Session
		fields = ['userId', 'expiresAt', 'id']