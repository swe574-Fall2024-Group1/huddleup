from rest_framework import serializers
from rest_framework import exceptions
from .models import User, Session


class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ['email', 'id', 'username', 'about_me']


class UserRegisterSerializer(serializers.ModelSerializer):
	password = serializers.CharField(write_only=True)
	email = serializers.EmailField(write_only=True)

	def validate_email(self, value):
		if User.objects.filter(email=value).exists():
			raise exceptions.ValidationError("User with this email already exists")
		return value

	def create(self, validated_data):
		user = User.objects.create_user(
			email=validated_data['email'],
			password=validated_data['password'],
		)
		return user

	class Meta:
		model = User
		fields = ['email', 'password', 'id']


class SessionSerializer(serializers.ModelSerializer):

	class Meta:
		model = Session
		fields = ['userId', 'expiresAt', 'id']