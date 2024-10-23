from django.urls import reverse
from django.test import RequestFactory, TestCase
from authAPI.models import User
from communityAPI.views import (create_community, get_community_members, get_community_banned,
								get_community_moderators, get_community_owners, assign_moderator)
from communityAPI.models import Community, CommunityUserConnection, Template
from authAPI.serializers import UserSerializer
from rest_framework import status
import base64
import json

class CommunityTests(TestCase):

	def setUp(self):
		self.request_factory = RequestFactory()
		user_data = {
			'username': 'testuser',
			'password': 'testpass'
		}
		user_serializer = UserSerializer(data=user_data)
		if user_serializer.is_valid():
			user_serializer.save()
		self.user = User.objects.get(username='testuser')

	def test_create_community(self):
		url = reverse('create_community')
		image_data = base64.b64encode(b"file_content").decode('utf-8')
		payload = {
			'name': 'Test Community',
			'description': 'A test community description',
			'mainImage': f'data:image/jpeg;base64,{image_data}',
			'isPrivate': False
		}

		request = self.request_factory.post(url, data=json.dumps(payload), content_type='application/json')
		request.user = self.user

		# Call the view directly
		response = create_community(request)

		# Print response content for debugging if status code is 400
		if response.status_code == status.HTTP_400_BAD_REQUEST:
			print(response.content)

		# Check response status code
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)

		# Check response data
		response_data = json.loads(response.content)
		self.assertTrue(response_data['success'])
		self.assertIn('id', response_data['data'])

		self.community_id = response_data['data']['id']

		# Verify the community was created in the database
		community = Community.objects.get(id=self.community_id)
		self.assertEqual(community.name, 'Test Community')
		self.assertEqual(community.description, 'A test community description')

		# Verify the community-user connection
		connection = CommunityUserConnection.objects.get(community=community, user=self.user)
		self.assertEqual(connection.type, 'owner')

		# Verify the default template
		template = Template.objects.get(community=community)
		self.assertEqual(template.createdBy, self.user)
		self.assertEqual(template.templateName, 'Default Template')
		self.assertEqual(template.rows, [
			{
				'title': 'Title',
				'type': 'string',
				'required': True
			},
			{
				'title': 'Text',
				'type': 'string',
				'required': True
			},
		])

	def test_get_community_members(self):
		self.test_create_community()

		user_data = {
			'username': 'memberuser',
			'password': 'testpass'
		}
		user_serializer = UserSerializer(data=user_data)
		if user_serializer.is_valid():
			user_serializer.save()
		member_user = User.objects.get(username='memberuser')
		CommunityUserConnection.objects.create(user=member_user, community_id=self.community_id, type="member")

		url = reverse('get_community_members')
		payload = {
			'communityId': self.community_id
		}
		request = self.request_factory.post(url, data=json.dumps(payload), content_type='application/json')
		request.user = self.user

		response = get_community_members(request)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		response_data = json.loads(response.content)
		self.assertTrue(response_data['success'])
		self.assertEqual(len(response_data['data']), 1)
		self.assertEqual(response_data['data'][0]['username'], member_user.username)
		self.assertEqual(response_data['data'][0]['type'], "member")

	def test_get_community_banned(self):
		self.test_create_community()

		user_data = {
			'username': 'banneduser',
			'password': 'testpass'
		}
		user_serializer = UserSerializer(data=user_data)
		if user_serializer.is_valid():
			user_serializer.save()
		banned_user = User.objects.get(username='banneduser')
		CommunityUserConnection.objects.create(user=banned_user, community_id=self.community_id, type="banned")

		url = reverse('get_community_banned')
		payload = {
			'communityId': self.community_id
		}
		request = self.request_factory.post(url, data=json.dumps(payload), content_type='application/json')
		request.user = self.user

		response = get_community_banned(request)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		response_data = json.loads(response.content)
		self.assertTrue(response_data['success'])
		self.assertEqual(len(response_data['data']), 1)
		self.assertEqual(response_data['data'][0]['username'], banned_user.username)
		self.assertEqual(response_data['data'][0]['type'], "banned")

	def test_get_community_moderators(self):
		self.test_create_community()

		user_data = {
			'username': 'moderatoruser',
			'password': 'testpass'
		}
		user_serializer = UserSerializer(data=user_data)
		if user_serializer.is_valid():
			user_serializer.save()
		moderator_user = User.objects.get(username='moderatoruser')
		CommunityUserConnection.objects.create(user=moderator_user, community_id=self.community_id, type="moderator")

		url = reverse('get_community_moderators')
		payload = {
			'communityId': self.community_id
		}
		request = self.request_factory.post(url, data=json.dumps(payload), content_type='application/json')
		request.user = self.user

		response = get_community_moderators(request)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		response_data = json.loads(response.content)
		self.assertTrue(response_data['success'])
		self.assertEqual(len(response_data['data']), 1)
		self.assertEqual(response_data['data'][0]['username'], moderator_user.username)
		self.assertEqual(response_data['data'][0]['type'], "moderator")

	def test_get_community_owners(self):
		self.test_create_community()

		url = reverse('get_community_owners')
		payload = {
			'communityId': self.community_id
		}
		request = self.request_factory.post(url, data=json.dumps(payload), content_type='application/json')
		request.user = self.user

		response = get_community_owners(request)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		response_data = json.loads(response.content)
		self.assertTrue(response_data['success'])
		self.assertEqual(len(response_data['data']), 1)
		self.assertEqual(response_data['data'][0]['username'], self.user.username)
		self.assertEqual(response_data['data'][0]['type'], "owner")

	def test_assign_moderator(self):
		self.test_create_community()

		user_data = {
			'username': 'memberuser',
			'password': 'testpass'
		}
		user_serializer = UserSerializer(data=user_data)
		if user_serializer.is_valid():
			user_serializer.save()
		member_user = User.objects.get(username='memberuser')
		CommunityUserConnection.objects.create(user=member_user, community_id=self.community_id, type="member")

		url = reverse('assign_moderator')
		payload = {
			'communityId': self.community_id,
			'username': member_user.username
		}
		request = self.request_factory.post(url, data=json.dumps(payload), content_type='application/json')
		request.user = self.user

		response = assign_moderator(request)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		response_data = json.loads(response.content)
		self.assertTrue(response_data['success'])
		self.assertEqual(response_data['message'], 'Moderator assigned/unassigned successfully')

		# Verify the user type is now 'moderator'
		connection = CommunityUserConnection.objects.get(user=member_user, community_id=self.community_id)
		self.assertEqual(connection.type, 'moderator')

	def tearDown(self):
		# Clean up any created data after each test
		User.objects.all().delete()
		Community.objects.all().delete()
		CommunityUserConnection.objects.all().delete()
		Template.objects.all().delete()
