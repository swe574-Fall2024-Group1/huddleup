from django.urls import reverse
from django.test import TestCase
from authAPI.models import User
from communityAPI.views import (create_community, get_community_members, get_community_banned,
								get_community_moderators, get_community_owners, assign_moderator, create_post, badges, get_recommended_users)
from communityAPI.class_views import TagList
from communityAPI.models import Community, CommunityUserConnection, Template, Post, Badge, PostLike, Comment, CommentLike, UserFollowConnection
from authAPI.serializers import UserSerializer
from rest_framework import status
import base64
import json
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from rest_framework.test import APIClient


class CommunityTests(TestCase):

	def setUp(self):
		self.request_factory = APIRequestFactory()
		self.user = User.objects.create_user(username='testuser', password='testpassword')
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

		request = self.request_factory.post(url, data=payload, format='json')
		force_authenticate(request, user=self.user)

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


		member_user = User.objects.create(username='memberuser', password='testpass')
		CommunityUserConnection.objects.create(user=member_user, community_id=self.community_id, type="member")

		url = reverse('get_community_members')
		payload = {
			'communityId': self.community_id
		}
		request = self.request_factory.post(url, data=payload, format='json')
		force_authenticate(request, user=self.user)

		response = get_community_members(request)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		response_data = json.loads(response.content)
		self.assertTrue(response_data['success'])
		self.assertEqual(len(response_data['data']), 1)
		self.assertEqual(response_data['data'][0]['username'], member_user.username)
		self.assertEqual(response_data['data'][0]['type'], "member")

	def test_get_community_banned(self):
		self.test_create_community()

		banned_user = User.objects.create(username='banneduser', password='testpass')
		CommunityUserConnection.objects.create(user=banned_user, community_id=self.community_id, type="banned")

		url = reverse('get_community_banned')
		payload = {
			'communityId': self.community_id
		}
		request = self.request_factory.post(url, data=payload, format='json')
		force_authenticate(request, user=self.user)

		response = get_community_banned(request)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		response_data = json.loads(response.content)
		self.assertTrue(response_data['success'])
		self.assertEqual(len(response_data['data']), 1)
		self.assertEqual(response_data['data'][0]['username'], banned_user.username)
		self.assertEqual(response_data['data'][0]['type'], "banned")

	def test_get_community_moderators(self):
		self.test_create_community()

		moderator_user = User.objects.create(username='moderatoruser', password='testpass')
		CommunityUserConnection.objects.create(user=moderator_user, community_id=self.community_id, type="moderator")

		url = reverse('get_community_moderators')
		payload = {
			'communityId': self.community_id
		}
		request = self.request_factory.post(url, data=payload, format='json')
		force_authenticate(request, user=self.user)

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
		request = self.request_factory.post(url, data=payload, format='json')
		force_authenticate(request, user=self.user)

		response = get_community_owners(request)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		response_data = json.loads(response.content)
		self.assertTrue(response_data['success'])
		self.assertEqual(len(response_data['data']), 1)
		self.assertEqual(response_data['data'][0]['username'], self.user.username)
		self.assertEqual(response_data['data'][0]['type'], "owner")

	def test_assign_moderator(self):
		self.test_create_community()

		moderator_user = User.objects.create(username='moderatoruser', password='testpass')
		CommunityUserConnection.objects.create(user=moderator_user, community_id=self.community_id, type="member")
		url = reverse('assign_moderator')
		payload = {
			'communityId': self.community_id,
			'username': moderator_user.username
		}
		request = self.request_factory.post(url, data=payload, format='json')
		force_authenticate(request, user=self.user)

		response = assign_moderator(request)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		response_data = json.loads(response.content)
		self.assertTrue(response_data['success'])

	def test_create_post_with_tags(self):
		self.test_create_community()
		url = reverse('create_post')
		community = Community.objects.all()[0]
		template = Template.objects.get(community=community)
		post_data = {
			'communityId': community.id,
			'templateId': template.id,
			'rowValues': ["title", "text"],
			'tags': ["tag1", "tag2", "tag3"]
		}

		request = self.request_factory.post(url, data=post_data, format='json')
		force_authenticate(request, user=self.user)

		response = create_post(request)
		response_data = json.loads(response.content)
		self.assertTrue(response_data["success"])
		the_post = Post.objects.all()[0]
		created_tags = set([x.name for x in the_post.tags.all()])
		self.assertEqual(the_post.rowValues[0], "title")
		self.assertEqual(the_post.rowValues[1], "text")
		self.assertEqual(created_tags, {"tag1", "tag2", "tag3"})

		"Badge Tests"

	def test_tag_existence(self):
		self.test_create_post_with_tags()
		url = reverse('tag_list')
		request = self.request_factory.get(url, data={"search": "tag"})
		force_authenticate(request, user=self.user)
		view = TagList.as_view()
		response = view(request)
		response_data = response.data
		self.assertEqual(set(response_data), {"tag1", "tag2", "tag3"})



	def tearDown(self):
		# Clean up any created data after each test
		User.objects.all().delete()
		Community.objects.all().delete()
		CommunityUserConnection.objects.all().delete()
		Template.objects.all().delete()

	class TestBadgesCase(TestCase):
		def setUp(self):
			self.request_factory = APIRequestFactory()
			self.user = User.objects.create_user(username='testuser', password='testpassword')

			self.user = User.objects.get(username='testuser')

		def test_badge_creation(self):
			url = reverse('create_badge')
			image_data = base64.b64encode(b"file_content").decode('utf-8')
			payload = {
				'name': 'Test Badge',
				'description': 'A test badge description',
				'image': f'data:image/jpeg;base64,{image_data}',
			}

			request = self.request_factory.post(url, data=payload, format='json')
			force_authenticate(request, user=self.user)

			# Call the view directly
			response = badges(request)

			# Print response content for debugging if status code is 400
			if response.status_code == status.HTTP_400_BAD_REQUEST:
				print(response.content)

			# Check response status code
			self.assertEqual(response.status_code, status.HTTP_201_CREATED)

			# Check response data
			response_data = json.loads(response.content)
			self.assertTrue(response_data['success'])
			self.assertIn('id', response_data['data'])

			self.badge_id = response_data['data']['id']

			# Verify the badge was created in the database
			badge = Badge.objects.get(id=self.badge_id)
			self.assertEqual(badge.name, 'Test Badge')
			self.assertEqual(badge.description, 'A test badge description')

class GetRecommendedUsersTestCase(TestCase):

	def setUp(self):

		self.request_factory = APIRequestFactory()

		# Create test users
		self.user1 = User.objects.create_user(username="user1", password="password1")
		self.user2 = User.objects.create_user(username="user2", password="password2")
		self.user3 = User.objects.create_user(username="user3", password="password3")
		self.user4 = User.objects.create_user(username="user4", password="password4")

		# Create a community
		communityInstance = CommunityTests()
		communityInstance.setUp()
		CommunityTests.test_create_community(communityInstance)
		self.community = Community.objects.all()[0]

		self.template = Template.objects.get(community=self.community)

		# Create posts
		self.post1 = Post.objects.create(
			createdBy=self.user1,
			community=self.community,
			template=self.template,
			rowValues=["Post 1 Title", "Post 1 Content"]
		)
		self.post2 = Post.objects.create(
			createdBy=self.user2,
			community=self.community,
			template=self.template,
			rowValues=["Post 2 Title", "Post 2 Content"]
		)

		# Create comments
		self.comment1 = Comment.objects.create(post=self.post1, createdBy=self.user3)
		self.comment2 = Comment.objects.create(post=self.post2, createdBy=self.user4)

		# Likes on posts
		PostLike.objects.create(post=self.post1, createdBy=self.user2, direction=True)
		PostLike.objects.create(post=self.post2, createdBy=self.user3, direction=True)

		# Likes on comments
		CommentLike.objects.create(comment=self.comment1, createdBy=self.user1, direction=True)
		CommentLike.objects.create(comment=self.comment2, createdBy=self.user1,
								   direction=True)  # Ensure user4 interacts

		# Follow connections (ensure user4 is not already followed)
		UserFollowConnection.objects.create(follower=self.user1, followee=self.user2)

		# Authenticate user1
		self.client = APIClient()
		self.client.login(username="user1", password="password1")

	def test_get_recommended_user_success(self):
		url = reverse('get_recommended_users')
		request = self.request_factory.post(url)
		force_authenticate(request, user=self.user1)
		response = get_recommended_users(request)

		# Parse the response JSON content
		response_data = json.loads(response.content)

		self.assertEqual(response.status_code, 200)

		# Check that the recommended users list contains the expected users
		recommended_user_ids = {user['id'] for user in response_data['data']}
		expected_user_ids = {self.user3.id, self.user4.id}  # Users not already followed
		self.assertEqual(recommended_user_ids, expected_user_ids)

	def test_no_interactions(self):
		# Clear all interactions
		PostLike.objects.all().delete()
		CommentLike.objects.all().delete()
		UserFollowConnection.objects.all().delete()
		Comment.objects.all().delete()

		url = reverse('get_recommended_users')
		request = self.request_factory.post(url)
		force_authenticate(request, user=self.user1)
		response = get_recommended_users(request)
		response_data = json.loads(response.content)

		recommended_user_ids = {user['id'] for user in response_data['data']}

		self.assertEqual(response.status_code, 200)

		# No recommendations should be returned
		self.assertEqual(recommended_user_ids, set())

