from rest_framework import serializers, exceptions
from .models import User, Session
from communityAPI.serializers import UserBadgeSerializer
from taggit.models import Tag
from communityAPI.models import TagSemanticMetadata
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

	class Meta:
		model = User
		# add badges of user
		fields = ['username', 'password', 'id', 'badges']


class SessionSerializer(serializers.ModelSerializer):

	class Meta:
		model = Session
		fields = ['userId', 'expiresAt', 'id']


class UpdateUserSerializer(serializers.ModelSerializer):
	tags = serializers.ListField(required=False, write_only=True)

	def update(self, instance, validated_data):
		tags = validated_data.pop('tags')
		instance = super(UpdateUserSerializer, self).update(instance, validated_data)
		wikidata_tags = {}
		all_tags = []
		for each in tags:
			if each["id"].startswith("Q"):
				wikidata_tags[each["id"]] = {"description": each["description"], "name": each["name"]}
				all_tags.append("{}-wdata-{}".format(each["name"], each["id"]))
			else:
				all_tags.append(each["name"])
		instance.tags.set(all_tags, clear=True)
		instance.save()
		instance.refresh_from_db()
		for eachkey, eachvalue in wikidata_tags.items():
			tag = Tag.objects.get(name="{}-wdata-{}".format(eachvalue["name"], eachkey))
			if not hasattr(tag, "semantic_metadata"):
				tag_semantic = TagSemanticMetadata(tag=tag, description=eachvalue["description"],
												   wikidata_id=eachkey)
				tag_semantic.save()
		return instance

	class Meta:
		model = User
		fields = ['about_me', 'tags']
