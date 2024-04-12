from rest_framework import serializers
from .models import Community, CommunityUserConnection, Template


class CommunitySerializer(serializers.ModelSerializer):

	class Meta:
		model = Community
		fields = ['name', 'description', 'mainImage', 'isPrivate', 'id']

class CommunityUserConnectionSerializer(serializers.ModelSerializer):

	class Meta:
		model = CommunityUserConnection
		fields = ['user', 'community', 'type', 'id', 'createdAt']

class TemplateSerializer(serializers.ModelSerializer):

	class Meta:
		model = Template
		fields = ['createdBy', 'community', 'templateName', 'rows', 'id', 'createdAt']
