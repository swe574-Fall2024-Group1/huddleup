from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q,Count
from django.utils import timezone



from authAPI.models import User
from communityAPI.models import Community, CommunityUserConnection, Template, Post, Comment, PostLike, CommentLike, CommunityInvitation, UserFollowConnection, Badge, UserBadge, TagSemanticMetadata, CommunityActivity
from communityAPI.serializers import CommunitySerializer, CommunityUserConnectionSerializer, TemplateSerializer, PostSerializer, CommentSerializer, PostLikeSerializer, CommentLikeSerializer, CommunityInvitationSerializer, UserFollowConnectionSerializer, BadgeSerializer, UserBadgeSerializer
from authAPI.serializers import UserSerializer

import json
import datetime
import re
from taggit.models import Tag

# Create a community with current user as owner
@api_view(['POST'])
def create_community(request):
	if request.method == 'POST':
		community_data = JSONParser().parse(request)
		community_serializer = CommunitySerializer(data=community_data)
		if community_serializer.is_valid():
			community_serializer.save()

			communityUserConnection_data = {
				'user': request.user.id,
				'community': community_serializer.data['id'],
				'type': 'owner'
			}

			communityUserConnection_serializer = CommunityUserConnectionSerializer(data=communityUserConnection_data)
			if communityUserConnection_serializer.is_valid():
				communityUserConnection_serializer.save()


				# Create default badges for the community

				com = Community.objects.get(id=community_serializer.data['id'])
				create_default_badges_for_community(com)
				log_community_activity(request.user, community_serializer.data['id'], 'create_community', {'Community Name': community_serializer.data['name']})

			# Create default template for the community
			template_data = {
				'createdBy': request.user.id,
				'community': community_serializer.data['id'],
				'templateName': 'Default Template',
				'rows': [
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
				]
			}
			template_serializer = TemplateSerializer(data=template_data)
			if template_serializer.is_valid():
				template_serializer.save()

			response_data = {
				'success': True,
				'data': {
					'id': community_serializer.data['id']
				}
			}
			return JsonResponse(response_data, status=201)
		return JsonResponse(community_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


# Get users that has connection with type 'member' of the community
@api_view(['POST'])
def get_community_members(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community = Community.objects.get(id=payload['communityId'])
		connections = CommunityUserConnection.objects.filter(community=community.id, type='member')
		members_data = []
		for connection in connections:
			members_data.append({
				'username': connection.user.username,
				'type': connection.type
			})
		response_data = {
			'success': True,
			'data': members_data
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Get users that banned from community
@api_view(['POST'])
def get_community_banned(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community = Community.objects.get(id=payload['communityId'])
		connections = CommunityUserConnection.objects.filter(community=community.id, type='banned')
		banned_data = []
		for connection in connections:
			banned_data.append({
				'username': connection.user.username,
				'type': connection.type
			})
		response_data = {
			'success': True,
			'data': banned_data
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Get users that has connection with type 'moderator' of the community
@api_view(['POST'])
def get_community_moderators(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community = Community.objects.get(id=payload['communityId'])
		connections = CommunityUserConnection.objects.filter(community=community.id, type='moderator')
		moderators_data = []
		for connection in connections:
			moderators_data.append({
				'username': connection.user.username,
				'type': connection.type
			})
		response_data = {
			'success': True,
			'data': moderators_data
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Get users that has connection with type 'owner' of the community
@api_view(['POST'])
def get_community_owners(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community = Community.objects.get(id=payload['communityId'])
		connections = CommunityUserConnection.objects.filter(community=community.id, type='owner')
		owners_data = []
		for connection in connections:
			owners_data.append({
				'username': connection.user.username,
				'type': connection.type
			})
		response_data = {
			'success': True,
			'data': owners_data
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Assign a moderator if current user is owner of the community, and unassign if user is already a moderator
@api_view(['POST'])
def assign_moderator(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community = Community.objects.get(id=payload['communityId'])
		user = User.objects.get(username=payload['username'])
		connection = CommunityUserConnection.objects.get(user=user.id, community=community.id)

		if connection.type == 'owner':
			return JsonResponse({'error': 'Owners cannot be assigned as moderators'}, status=403)

		if connection.type == 'moderator':
			connection.type = 'member'
		else:
			connection.type = 'moderator'

		connection.save()
		log_community_activity(request.user, community.id, 'make_moderator', {'Username': user.username})

		return JsonResponse({'success': True, 'message': 'Moderator assigned/unassigned successfully'}, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Change ownership of the community if current user is owner of the community
@api_view(['POST'])
def change_ownership(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community = Community.objects.get(id=payload['communityId'])
		new_owner = User.objects.get(username=payload['username'])
		current_owner = CommunityUserConnection.objects.get(community=community.id, type='owner')

		current_owner.type = 'member'
		current_owner.save()

		new_owner_connection = CommunityUserConnection.objects.get(user=new_owner.id, community=community.id)
		new_owner_connection.type = 'owner'
		new_owner_connection.save()
		log_community_activity(request.user, community.id, 'make_owner', {'username': new_owner.username})


		return JsonResponse({'success': True, 'message': 'Ownership changed successfully'}, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Ban a user from the community if current user is owner of the community
@api_view(['POST'])
def get_community_info(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community_id = payload.get('communityId')

		try:
			community = Community.objects.get(id=community_id)
		except Community.DoesNotExist:
			return JsonResponse({'success': False, 'error': 'Community not found'}, status=404)

		try:
			connection = CommunityUserConnection.objects.get(user=request.user.id, community=community_id)
			member_type = connection.type
		except ObjectDoesNotExist:
			connection = None
			member_type = 'notMember'

		# Fetch badges for the community
		badges = Badge.objects.filter(community=community_id)
		badges_data = []
		for badge in badges:
			user_has_badge = UserBadge.objects.filter(user=request.user.id, badge=badge.id).exists()
			badges_data.append({
				'image': badge.image,
				'name': badge.name,
				'description': badge.description,
				'userHasBadge': user_has_badge
			})

		response_data = {
			'success': True,
			'data': {
				'name': community.name,
				'description': community.description,
				'isPrivate': community.isPrivate,
				'mainImage': community.mainImage,
				'archived': community.archived,
				'id': community.id,
				'memberType': member_type,
				'badges': badges_data
			}
		}

		return JsonResponse(response_data, status=200)
	else:
		return JsonResponse({'error': 'Invalid request method'}, status=400)

# Gets all communities that user is not member of and not archived
@api_view(['POST'])
def get_communities(request):
	if request.method == 'POST':
		# Get connections
		connections = CommunityUserConnection.objects.filter(user=request.user.id)
		community_ids = [connection.community.id for connection in connections]

		# Get communities that user is not member of and not archived
		communities = Community.objects.all()

		# Filter out the communities that user is already a member of
		communities = [community for community in communities if community.id not in community_ids and not community.archived]

		communities_data = []

		for community in communities:
			communities_data.append({
				'id': community.id,
				'name': community.name,
				'mainImage': community.mainImage,
				'description': community.description,
				'isPrivate': community.isPrivate
			})

		response_data = {
			'success': True,
			'data': communities_data
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Get all communities that user is member of and not archived
@api_view(['POST'])
def get_user_communities(request):
	if request.method == 'POST':
		# Get connections if not banned
		connections = CommunityUserConnection.objects.filter(Q(user=request.user.id) & ~Q(type='banned'))
		communities_data = []

		for connection in connections:
			communities_data.append({
				'id': connection.community.id,
				'name': connection.community.name,
				'mainImage': connection.community.mainImage,
				'description': connection.community.description,
				'isPrivate': connection.community.isPrivate,
				'archived': connection.community.archived,
				'type': connection.type
			})

		# Filter archived communities
		communities_data = [community for community in communities_data if not community['archived']]

		response_data = {
			'success': True,
			'data': communities_data
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


# Get user profile by user id
@api_view(['POST'])
def get_user_profile(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		user_id = payload['userId']
		user = User.objects.get(id=user_id)
		user_serializer = UserSerializer(user)
		isFollowing = UserFollowConnection.objects.filter(follower=request.user, followee=user).exists()

		# get all commmunities that user is member of and get image and name and desc of the communities
		connections = CommunityUserConnection.objects.filter(user=user_id)
		communities_data = []

		for connection in connections:
			communities_data.append({
				'id': connection.community.id,
				'name': connection.community.name,
				'mainImage': connection.community.mainImage,
				'description': connection.community.description,
				'isPrivate': connection.community.isPrivate,
				'archived': connection.community.archived,
				'type': connection.type
			})

		# Fetch user badges
		user_badges = UserBadge.objects.filter(user=user_id)
		user_badges_data = []
		for user_badge in user_badges:
			user_badges_data.append({
				'badge': {
					'id': user_badge.badge.id,
					'name': user_badge.badge.name,
					'image': user_badge.badge.image,
					'type': user_badge.badge.type,
					'description': user_badge.badge.description,
					'criteria': user_badge.badge.criteria,
					'community': user_badge.badge.community.name if user_badge.badge.community else None
				},
				'badgeAssignedAt': user_badge.createdAt,
			})

		response_data = {
			'success': True,
			'data': {
				'username': user_serializer.data['username'],
				'isFollowing': isFollowing,
				'about_me': user.about_me,
				'tags': list(user.tags.values_list('name', flat=True)),
				'id': user_serializer.data['id'],
				'badges': user_badges_data,
				'communities': communities_data
			}
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


# If community is not private and user is not member of the community, add user to the community
@api_view(['POST'])
def join_community(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community = Community.objects.get(id=payload['communityId'])
		# Check if the community is private
		if community.isPrivate:
			return JsonResponse({'error': 'Community is private'}, status=400)

		# Check if the user is already a member of the community
		communityUserConnection = CommunityUserConnection.objects.filter(user=request.user.id, community=community.id).first()
		if communityUserConnection is not None:
			return JsonResponse({'error': 'User is already a member of the community'}, status=400)

		communityUserConnection_data = {
			'user': request.user.id,
			'community': community.id,
			'type': 'member'
		}
		communityUserConnection_serializer = CommunityUserConnectionSerializer(data=communityUserConnection_data)
		if communityUserConnection_serializer.is_valid():
			communityUserConnection_serializer.save()
			log_community_activity(request.user, community.id, 'join_community', {'Community Name': community.name})
			return JsonResponse({'success': True, 'message': 'User added to the community successfully'}, status=201)
		return JsonResponse(communityUserConnection_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# If community is private and user is member or moderator of the community, remove user from the community (owners cant leave the community)
@api_view(['POST'])
def leave_community(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community = Community.objects.get(id=payload['communityId'])
		connection = CommunityUserConnection.objects.get(user=request.user.id, community=community.id)

		if connection.type == 'owner':
			return JsonResponse({'error': 'Owners cannot leave the community'}, status=403)

		connection.delete()
		return JsonResponse({'success': True, 'message': 'User removed from the community successfully'}, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


# Create a invitation for a user to join a community if community is private and inviter user is owner or moderator of the community and invited user is not member of the community 
@api_view(['POST'])
def create_invitation(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community = Community.objects.get(id=payload['communityId'])
		connection = CommunityUserConnection.objects.get(user=request.user.id, community=community.id)

		if connection.type == 'member':
			return JsonResponse({'error': 'User is not authorized to create invitations'}, status=403)

		try:
			invitedUser = User.objects.get(username=payload['username'])
		except User.DoesNotExist:
			return JsonResponse({'error': 'User not found'}, status=404)

		# Check if the user is already a member of the community
		invitedUserConnection = CommunityUserConnection.objects.filter(user=invitedUser.id, community=community.id).first()
		if invitedUserConnection is not None:
			return JsonResponse({'error': 'User is already a member of the community'}, status=400)

		invitation_data = {
			'user': invitedUser.id,
			'community': community.id
		}
		invitation_serializer = CommunityInvitationSerializer(data=invitation_data)
		if invitation_serializer.is_valid():
			invitation_serializer.save()

			# Return details of invitaiton
			response_data = {
				'success': True,
				'data': {
					'id': invitation_serializer.data['id'],
					'username': invitedUser.username,
					'community': community.name,
					'createdAt': invitation_serializer.data['createdAt']
				}
			}
			return JsonResponse(response_data, status=201)

		return JsonResponse(invitation_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# If community is private and user is owner or moderator of the community or either user is the member that invited, delete the invitation
@api_view(['POST'])
def cancel_invitation(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		invitation = CommunityInvitation.objects.get(id=payload['invitationId'])
		community = invitation.community
		inviter = invitation.user
		inviterConnection = CommunityUserConnection.objects.filter(user=inviter.id, community=community.id).first()
		connection = CommunityUserConnection.objects.get(user=request.user.id, community=community.id)

		if connection.type == 'member' and inviter.id != request.user.id:
			return JsonResponse({'error': 'User is not authorized to cancel the invitation'}, status=403)

		invitation.delete()
		return JsonResponse({'success': True, 'message': 'Invitation canceled successfully'}, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


# If community is private and user is owner or moderator of the community, get all invitations of the community
@api_view(['POST'])
def get_invitations_by_community(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community = Community.objects.get(id=payload['communityId'])
		connection = CommunityUserConnection.objects.get(user=request.user.id, community=community.id)

		if connection.type == 'member':
			return JsonResponse({'error': 'User is not authorized to view invitations'}, status=403)

		invitations = CommunityInvitation.objects.filter(community=community.id)
		invitations_data = []
		for invitation in invitations:
			invitations_data.append({
				'id': invitation.id,
				'username': invitation.user.username,
				'community': invitation.community.name,
				'createdAt': invitation.createdAt
			})
		response_data = {
			'success': True,
			'data': invitations_data
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Get all invitations of the user
@api_view(['POST'])
def get_invitations_by_user(request):
	if request.method == 'POST':
		invitations = CommunityInvitation.objects.filter(user=request.user.id)
		invitations_data = []
		for invitation in invitations:
			invitations_data.append({
				'id': invitation.id,
				'community': invitation.community.name,
				'createdAt': invitation.createdAt
			})
		response_data = {
			'success': True,
			'data': invitations_data
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Response invitation either as accept or decline, delete invitation in both cases and add user to the community if accepted
@api_view(['POST'])
def response_invitation(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		invitation = CommunityInvitation.objects.get(id=payload['invitationId'])
		community = invitation.community
		invitedUser = invitation.user
		invitedUserConnection = CommunityUserConnection.objects.filter(user=invitedUser.id, community=community.id).first()

		if invitedUserConnection is not None:
			return JsonResponse({'error': 'User is already a member of the community'}, status=400)

		if payload['response'] == 'accept':
			# Add user to the community
			communityUserConnection_data = {
				'user': invitedUser.id,
				'community': community.id,
				'type': 'member'
			}
			communityUserConnection_serializer = CommunityUserConnectionSerializer(data=communityUserConnection_data)
			if communityUserConnection_serializer.is_valid():
				communityUserConnection_serializer.save()
			else:
				return JsonResponse(communityUserConnection_serializer.errors, status=400)

		invitation.delete()
		return JsonResponse({'success': True, 'message': 'Invitation response processed successfully'}, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Get all posts of the community
@api_view(['POST'])
def get_community_posts(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community_id = payload.get('communityId')
		template_id = payload.get('templateId')
		advanced_search = payload.get('advancedSearch')
		search_query = payload.get('searchQuery').lower() if payload.get('searchQuery') else None


		if template_id:
			posts = Post.objects.filter(community=community_id, template=template_id)
		else:
			posts = Post.objects.filter(community=community_id)


		if advanced_search:
			template = Template.objects.get(id=template_id)
			template_rows = template.rows  # Directly access the rows list

			def map_row_values(row_values_list, template_rows):
				"""Map row values to dictionary based on titles in the template."""
				try:
					return {template_rows[i]['title'].lower(): row_values_list[i] for i in range(len(template_rows))}
				except IndexError as e:
					print(f"Error mapping row values: {e}")
					return {}

			def matches_advanced_search(post):
				row_values = map_row_values(post.rowValues, template_rows)

				for row in template_rows:
					row_title = row['title'].lower()
					row_type = row['type']

					if row_type in ['string', 'normalizedString', 'token']:
						value = advanced_search.get(row_title)
						if value and value.lower() not in row_values.get(row_title, '').lower():
							return False
					elif row_type in ['integer', 'int', 'byte', 'short', 'long', 'positiveInteger', 'negativeInteger',
									  'nonPositiveInteger', 'nonNegativeInteger', 'unsignedInt', 'unsignedByte',
									  'unsignedShort', 'unsignedLong']:
						min_value = advanced_search.get(f"{row_title}_min")
						max_value = advanced_search.get(f"{row_title}_max")
						actual_value = row_values.get(row_title)
						if min_value is not None and (actual_value is None or int(actual_value) < int(min_value)):
							return False
						if max_value is not None and (actual_value is None or int(actual_value) > int(max_value)):
							return False
					elif row_type in ['float', 'double']:
						min_value = advanced_search.get(f"{row_title}_min")
						max_value = advanced_search.get(f"{row_title}_max")
						actual_value = row_values.get(row_title)
						if min_value is not None and (actual_value is None or float(actual_value) < float(min_value)):
							return False
						if max_value is not None and (actual_value is None or float(actual_value) > float(max_value)):
							return False
					elif row_type == 'Boolean':
						value = advanced_search.get(row_title)
						if value is not None and row_values.get(row_title) != str(value).lower() in ('true', '1'):
							return False
					elif row_type == 'date':
						min_value = advanced_search.get(f"{row_title}_min")
						max_value = advanced_search.get(f"{row_title}_max")
						actual_value = row_values.get(row_title)
						if actual_value:
							actual_date = datetime.datetime.strptime(actual_value, "%Y-%m-%d").date()
							if min_value and actual_date < datetime.datetime.strptime(min_value, "%Y-%m-%d").date():
								return False
							if max_value and actual_date > datetime.datetime.strptime(max_value, "%Y-%m-%d").date():
								return False
						else:
							return False
					elif row_type == 'dateTime':
						min_value = advanced_search.get(f"{row_title}_min")
						max_value = advanced_search.get(f"{row_title}_max")
						actual_value = row_values.get(row_title)
						if actual_value:
							actual_datetime = datetime.datetime.strptime(actual_value, "%Y-%m-%dT%H:%M:%S")
							if min_value and actual_datetime < datetime.datetime.strptime(min_value, "%Y-%m-%dT%H:%M:%S"):
								return False
							if max_value and actual_datetime > datetime.datetime.strptime(max_value, "%Y-%m-%dT%H:%M:%S"):
								return False
						else:
							return False
					elif row_type == 'gYear':
						min_value = advanced_search.get(f"{row_title}_min")
						max_value = advanced_search.get(f"{row_title}_max")
						actual_value = row_values.get(row_title)
						if actual_value:
							actual_year = int(actual_value)
							if min_value and actual_year < int(min_value):
								return False
							if max_value and actual_year > int(max_value):
								return False
						else:
							return False

				return True

			posts = filter(matches_advanced_search, posts)

		if search_query:
			def matches_search_query(post):
				# Check if search_query is in the template name
				if search_query in post.template.templateName.lower():
					return True
				# Check if search_query is in any of the row values
				for value in post.rowValues:
					if search_query in str(value).lower():
						return True
				return False

			posts = filter(matches_search_query, posts)

		posts_data = []
		for post in posts:
			likes = PostLike.objects.filter(post=post.id)
			like_count = 0
			dislike_count = 0
			for like in likes:
				if like.direction:
					like_count += 1
				else:
					dislike_count += 1

			userLike = PostLike.objects.filter(post=post.id, createdBy=request.user).first()

			likedByUser = False
			dislikedByUser = False
			if userLike is not None:
				if userLike.direction:
					likedByUser = True
				else:
					dislikedByUser = True

			isFollowing = UserFollowConnection.objects.filter(follower=request.user, followee=post.createdBy).exists()

			# Fetch user badges
			user_badges = UserBadge.objects.filter(user=post.createdBy, badge__community=community_id)
			user_badges_data = []
			for user_badge in user_badges:
				user_badges_data.append({
					'id': user_badge.badge.id,
					'badge': {
						'id': user_badge.badge.id,
						'name': user_badge.badge.name,
						'image': user_badge.badge.image,
						'type': user_badge.badge.type,
						'description': user_badge.badge.description,
						'criteria': user_badge.badge.criteria,
						'createdAt': user_badge.badge.createdAt,
						'community': user_badge.badge.community.id if user_badge.badge.community else None
					},
					'createdAt': user_badge.createdAt,
				})

			posts_data.append({
				'id': post.id,
				'username': post.createdBy.username,
				'user_badges': user_badges_data,
				'user_id': post.createdBy.id,
				'createdAt': post.createdAt,
				'rowValues': post.rowValues,
				'templateId': post.template.id,
				'isEdited': post.isEdited,
				'likeCount': like_count,
				'dislikeCount': dislike_count,
				'liked': likedByUser,
				'disliked': dislikedByUser,
				'isFollowing': isFollowing,
				'tags': [{"name": x.name if not hasattr(x, "semantic_metadata") else x.name.split("-wdata-")[0],
						  "id": x.id if not hasattr(x, "semantic_metadata") else x.semantic_metadata.wikidata_id,
						  "description": x.semantic_metadata.description if hasattr(x, "semantic_metadata") else ""
			} for x in post.tags.all()]
			})

		# Sort the posts by createdAt in descending order
		posts_data.sort(key=lambda x: x['createdAt'], reverse=True)

		response_data = {
			'success': True,
			'data': posts_data
		}
		return JsonResponse(response_data, status=200)

	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Get user feed posts. Posts of the communities that user is member,moderator,owner of and posts of the users that user is following (in the post object add as feedType either 'communityMembership' or 'userFollow' to distinguish). Dont include banned communities posts. Posts should be owned by other users and sorted by createdAt decreasing.
@api_view(['POST'])
def get_user_feed(request):
	if request.method == 'POST':
		# Get user connections
		connections = CommunityUserConnection.objects.filter(Q(user=request.user.id) & ~Q(type='banned'))
		community_ids = [connection.community.id for connection in connections]

		# Get user follow connections
		follows = UserFollowConnection.objects.filter(follower=request.user.id)
		followed_user_ids = [follow.followee.id for follow in follows]

		# Get posts of the communities
		community_posts = Post.objects.filter(community__in=community_ids)

		# Get posts of the users that user is following
		user_posts = Post.objects.filter(createdBy__in=followed_user_ids)

		# Combine the posts
		posts = list(community_posts) + list(user_posts)

		# Sort the posts by createdAt in descending order
		posts.sort(key=lambda x: x.createdAt, reverse=True)

		posts_data = []
		for post in posts:
			likes = PostLike.objects.filter(post=post.id)
			like_count = 0
			dislike_count = 0
			for like in likes:
				if like.direction:
					like_count += 1
				else:
					dislike_count += 1

			userLike = PostLike.objects.filter(post=post.id, createdBy=request.user).first()

			likedByUser = False
			dislikedByUser = False
			if userLike is not None:
				if userLike.direction:
					likedByUser = True
				else:
					dislikedByUser = True

			isFollowing = UserFollowConnection.objects.filter(follower=request.user, followee=post.createdBy).exists()

			if post.community.id in community_ids:
				feedType = 'communityMembership'
			else:
				feedType = 'userFollow'

			posts_data.append({
				'id': post.id,
				'username': post.createdBy.username,
				'userId': post.createdBy.id,
				'createdAt': post.createdAt,
				'rowValues': post.rowValues,
				'templateId': post.template.id,
				'isEdited': post.isEdited,
				'likeCount': like_count,
				'dislikeCount': dislike_count,
				'liked': likedByUser,
				'disliked': dislikedByUser,
				'isFollowing': isFollowing,
				'feedType': feedType,
				'communityName': post.community.name,
				'communityId': post.community.id
			})

		# Filter that user is member, moderator or owner of and not owned by current user
		posts_data = [post for post in posts_data if post['username'] != request.user.username]

		# Filter duplicates in posts_data
		unique_posts = {}
		for post in posts_data:
			unique_posts[post['id']] = post

		posts_data = list(unique_posts.values())


		response_data = {
			'success': True,
			'data': posts_data
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Create a post with the template of the community
@api_view(['POST'])
def create_template(request):
	if request.method == 'POST':
		request_data = JSONParser().parse(request)

		template_data = {
				'createdBy': request.user.id,
				'community': request_data['communityId'],
				'templateName': request_data['templateName'],
				'rows': request_data['rows']
		}
		template_serializer = TemplateSerializer(data=template_data)
		if template_serializer.is_valid():
			template=template_serializer.save()
			log_community_activity(request.user, request_data['communityId'], 'create_template', {'templateId': template.id, 'Template Name': template.templateName})


			# Check for and award badges
			check_and_award_badges(request.user, request_data['communityId'])

			response_data = {
				'success': True,
				'data': {
					'id': template_serializer.data['id']
				}
			}
			return JsonResponse(response_data, status=201)
		return JsonResponse(template_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Get all templates of the community
@api_view(['POST'])
def get_templates(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		templates = Template.objects.filter(community=payload['communityId'])
		templates_data = []
		for template in templates:
			templates_data.append({
				'id': template.id,
				'templateName': template.templateName,
				'rows': template.rows,
				'isDeleted': template.isDeleted
			})

		# Filter deleted templates
		templates_data = [template for template in templates_data if not template['isDeleted']]

		response_data = {
			'success': True,
			'data': templates_data
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Get template by id
@api_view(['POST'])
def get_template(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		template = Template.objects.get(id=payload['templateId'])
		template_data = {
			'id': template.id,
			'templateName': template.templateName,
			'rows': template.rows
		}
		response_data = {
			'success': True,
			'data': template_data
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Create a post with the template of the community
@api_view(['POST'])
def create_post(request):
	if request.method == 'POST':
		request_data = JSONParser().parse(request)
		wikidata_tags = {}
		all_tags = []
		for each in request_data.get("tags"):
			if each["id"].startswith("Q"):
				wikidata_tags[each["id"]] = {"description": each["description"], "name": each["name"]}
				all_tags.append("{}-wdata-{}".format(each["name"], each["id"]))
			else:
				all_tags.append(each["name"])

		post_data = {
				'createdBy': request.user.id,
				'community': request_data['communityId'],
				'template': request_data['templateId'],
				'rowValues': request_data['rowValues'],
				'tags': all_tags
		}
		post_serializer = PostSerializer(data=post_data)
		if post_serializer.is_valid():
			post = post_serializer.save()
			for eachkey, eachvalue in wikidata_tags.items():
				tag = Tag.objects.get(name="{}-wdata-{}".format(eachvalue["name"], eachkey))
				if not hasattr(tag, "semantic_metadata"):
					tag_semantic = TagSemanticMetadata(tag=tag, description=eachvalue["description"],
													   wikidata_id=eachkey)
					tag_semantic.save()
			check_and_award_badges(request.user, request_data['communityId'])
			log_community_activity(request.user, request_data['communityId'], 'create_post', {'postId': post.id, 'Title': post.rowValues[0]})

			response_data = {
				'success': True,
				'data': {
					'id': post_serializer.data['id']
				}
			}
			post.refresh_from_db()
			post.update_tag_usage_create()
			return JsonResponse(response_data, status=201)
		return JsonResponse(post_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


# Create a comment for a post
@api_view(['POST'])
def add_comment(request):
	if request.method == 'POST':
		request_data = JSONParser().parse(request)

		comment_data = {
				'createdBy': request.user.id,
				'post': request_data['postId'],
				'comment': request_data['comment']
		}
		comment_serializer = CommentSerializer(data=comment_data)
		if comment_serializer.is_valid():
			comment=comment_serializer.save()
			

			# Get the community from the post
			post = Post.objects.get(id=request_data['postId'])
			check_and_award_badges(request.user, post.community.id)
			log_community_activity(request.user, post.community.id, 'add_comment', {'commentId': comment.id, 'postId': post.id, 'Content': comment.comment})


			response_data = {
				'success': True,
				'data': {
					'id': comment_serializer.data['id']
				}
			}
			return JsonResponse(response_data, status=201)
		return JsonResponse(comment_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Get comments of a post with like and unlike counts
@api_view(['POST'])
def get_post_comments(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		post = Post.objects.get(id=payload['postId'])
		comments = Comment.objects.filter(post=post.id)
		comments_data = []
		for comment in comments:
			likes = CommentLike.objects.filter(comment=comment.id)
			like_count = 0
			dislike_count = 0
			for like in likes:
				if like.direction:
					like_count += 1
				else:
					dislike_count += 1

			userLike = CommentLike.objects.filter(comment=comment.id, createdBy=request.user).first()

			likedByUser = False
			dislikedByUser = False
			if userLike is not None:
				if userLike.direction:
					likedByUser = True
				else:
					dislikedByUser = True

			comments_data.append({
				'id': comment.id,
				'username': comment.createdBy.username,
				'userId': comment.createdBy.id,
				'createdAt': comment.createdAt,
				'comment': comment.comment,
				'isEdited': comment.isEdited,
				'likeCount': like_count,
				'dislikeCount': dislike_count,
				'liked': likedByUser,
				'disliked': dislikedByUser
			})
		response_data = {
			'success': True,
			'data': comments_data
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Like or unlike a post
@api_view(['POST'])
def like_post(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		post_id = payload.get('postId')
		direction = payload.get('direction')

		try:
			post = Post.objects.get(id=post_id)
		except Post.DoesNotExist:
			return JsonResponse({'error': 'Post not found'}, status=404)

		# Check if the user has already liked the post
		existing_like = PostLike.objects.filter(post=post_id, createdBy=request.user).first()

		if existing_like:
			# If the user has already liked the post, remove the like
			existing_like.delete()
			return JsonResponse({'success': True, 'message': 'Like removed successfully'}, status=200)
		else:
			# If the user hasn't liked the post or liked in a different direction, add the like
			like_data = {
				'createdBy': request.user.id,
				'post': post_id,
				'direction': direction
			}
			like_serializer = PostLikeSerializer(data=like_data)

			if like_serializer.is_valid():
				like_serializer.save()

				# Check for and award badges
				check_and_award_badges(post.createdBy, post.community.id)
				log_community_activity(request.user, post.community.id, 'like_post', {'postId': post.id, 'Title': post.rowValues[0]})


				return JsonResponse({'success': True, 'message': 'Like added successfully'}, status=201)
			else:
				return JsonResponse(like_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Like or unlike a comment
@api_view(['POST'])
def like_comment(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		comment_id = payload.get('commentId')
		direction = payload.get('direction')

		try:
			comment = Comment.objects.get(id=comment_id)
		except Comment.DoesNotExist:
			return JsonResponse({'error': 'Comment not found'}, status=404)
		
		post = Post.objects.get(id=comment.post.id)
		community_id = post.community.id  # Access community ID from the post
		

		# Check if the user has already liked the comment
		existing_like = CommentLike.objects.filter(comment=comment, createdBy=request.user).first()

		if existing_like:
			# If the user has already liked the comment, remove the like
			existing_like.delete()
			return JsonResponse({'success': True, 'message': 'Like removed successfully'}, status=200)
		else:
			# If the user hasn't liked the comment or liked in a different direction, add the like
			like_data = {
				'createdBy': request.user.id,
				'comment': comment.id,
				'direction': direction
			}
			like_serializer = CommentLikeSerializer(data=like_data)

			if like_serializer.is_valid():
				like=like_serializer.save()
				log_community_activity(request.user, community_id, 'like_comment', {'commentId': like.comment.id, 'Content': comment.comment})

				return JsonResponse({'success': True, 'message': 'Like added successfully'}, status=201)
			else:
				return JsonResponse(like_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


@api_view(['POST'])
def follow_user(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		followee = User.objects.get(username=payload['username'])

		# Check if the user is already following
		if UserFollowConnection.objects.filter(follower=request.user, followee=followee).exists():
			UserFollowConnection.objects.filter(follower=request.user, followee=followee).delete()
			return JsonResponse({'success': True, 'message': 'User unfollowed successfully'}, status=200)
		else:
			follow_data = {
				'follower': request.user.id,
				'followee': followee.id
			}
			follow_serializer = UserFollowConnectionSerializer(data=follow_data)

			if follow_serializer.is_valid():
				follow_serializer.save()
				log_community_activity(request.user, None, 'follow_user', {'followedUser': followee.username})
				# Infer community where both follower and followee belong
				community_connections = CommunityUserConnection.objects.filter(
					user=request.user
				).values_list('community', flat=True)

				# Find a shared community between the follower and followee
				shared_community = CommunityUserConnection.objects.filter(
					user=followee,
					community__in=community_connections
				).values_list('community', flat=True).first()

				if shared_community:
					check_and_award_badges(request.user, shared_community)

				return JsonResponse({'success': True, 'message': 'User followed successfully'}, status=201)
			else:
				return JsonResponse(follow_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


# Get all users that user is following and followers of the user
@api_view(['POST'])
def get_user_connections(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		followers = UserFollowConnection.objects.filter(followee=request.user)
		followers_data = []
		for follower in followers:
			followers_data.append({
				'username': follower.follower.username,
				'userId': follower.follower.id
			})

		following = UserFollowConnection.objects.filter(follower=request.user)
		following_data = []
		for followee in following:
			following_data.append({
				'username': followee.followee.username,
				'userId': followee.followee.id
			})

		response_data = {
			'success': True,
			'data': {
				'followers': followers_data,
				'following': following_data
			}
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Ban user from community if current user is owner or moderator of the community (moderators can not ban owners). If user banned already, unban user
@api_view(['POST'])
def ban_user(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community = Community.objects.get(id=payload['communityId'])
		user = User.objects.get(username=payload['username'])
		connection = CommunityUserConnection.objects.get(user=user.id, community=community.id)

		if connection.type == 'owner':
			return JsonResponse({'error': 'Owners cannot be banned from the community'}, status=403)

		if connection.type == 'banned':
			connection.type = 'member'
		else:
			connection.type = 'banned'

		connection.save()
		log_community_activity(request.user, community.id, 'ban_user', {'Username': user.username})

		return JsonResponse({'success': True, 'message': 'User banned/unbanned successfully'}, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


# Delete post if current user is owner of the post or owner or moderator of the community
@api_view(['POST'])
def delete_post(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		post = Post.objects.get(id=payload['postId'])
		community = Community.objects.get(id=post.community.id)
		user_connection = CommunityUserConnection.objects.get(user=request.user.id, community=community.id)

		if user_connection.type == 'owner' or user_connection.type == 'moderator' or post.createdBy == request.user:
			post.delete()
			return JsonResponse({'success': True, 'message': 'Post deleted successfully'}, status=200)
		return JsonResponse({'error': 'User is not authorized to delete the post'}, status=403)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Delete comment if current user is owner of the post or owner or moderator of the community
@api_view(['POST'])
def delete_comment(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		comment = Comment.objects.get(id=payload['commentId'])
		post = Post.objects.get(id=comment.post.id)
		community = Community.objects.get(id=post.community.id)
		user_connection = CommunityUserConnection.objects.get(user=request.user.id, community=community.id)

		if user_connection.type == 'owner' or user_connection.type == 'moderator' or comment.createdBy == request.user:
			comment.delete()
			return JsonResponse({'success': True, 'message': 'Comment deleted successfully'}, status=200)
		return JsonResponse({'error': 'User is not authorized to delete the comment'}, status=403)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Get post details in format {post:{...}, template: {...}} if user owner of the post
@api_view(['POST'])
def get_post_details(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		post = Post.objects.get(id=payload['postId'])
		community = Community.objects.get(id=post.community.id)
		user_connection = CommunityUserConnection.objects.get(user=request.user.id, community=community.id)

		if user_connection.type == 'owner' or user_connection.type == 'moderator' or post.createdBy == request.user:
			tags = []
			for each in post.tags.all():
				tags.append({"name": each.name, "description": "", "id": str(each.id)} if
				             not hasattr(each, "semantic_metadata") else
				            {"name": each.name.split("-wdata-")[0], "id": each.semantic_metadata.wikidata_id,
				             "description": each.semantic_metadata.description})
			post_data = {
				'id': post.id,
				'createdBy': post.createdBy.username,
				'createdAt': post.createdAt,
				'rowValues': post.rowValues,
				'tags': tags
			}

			template = Template.objects.get(id=post.template.id)
			template_data = {
				'id': template.id,
				'templateName': template.templateName,
				'rows': template.rows
			}

			response_data = {
				'success': True,
				'data': {
					'post': post_data,
					'template': template_data
				}
			}
			return JsonResponse(response_data, status=200)
		return JsonResponse({'error': 'User is not authorized to view the post details'}, status=403)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Edit post if current user is owner of the post, and make post isEdited true
@api_view(['POST'])
def edit_post(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		post = Post.objects.get(id=payload['postId'])
		community = Community.objects.get(id=post.community.id)
		user_connection = CommunityUserConnection.objects.get(user=request.user.id, community=community.id)
		existing_tags = [x.id for x in post.tags.all()]

		if user_connection.type == 'owner' or user_connection.type == 'moderator' or post.createdBy == request.user:
			post.rowValues = payload['rowValues']
			post.isEdited = True
			wikidata_tags = {}
			all_tags = []
			for each in payload.get("tags"):
				if each["id"].startswith("Q"):
					wikidata_tags[each["id"]] = {"description": each["description"], "name": each["name"]}
					all_tags.append("{}-wdata-{}".format(each["name"], each["id"]))
				else:
					all_tags.append(each["name"])
			post.tags.set(all_tags, clear=True)
			post.save()
			post.refresh_from_db()
			for eachkey, eachvalue in wikidata_tags.items():
				tag = Tag.objects.get(name="{}-wdata-{}".format(eachvalue["name"], eachkey))
				if not hasattr(tag, "semantic_metadata"):
					tag_semantic = TagSemanticMetadata(tag=tag, description=eachvalue["description"],
													   wikidata_id=eachkey)
					tag_semantic.save()
			all_tags = [x.id for x in post.tags.all()]
			deleted_tags = set(existing_tags).difference(set(all_tags))
			added_tags = set(all_tags).difference(set(existing_tags))
			post.update_tag_usage_edit(added_tags, deleted_tags)
			return JsonResponse({'success': True, 'message': 'Post edited successfully'}, status=200)
		return JsonResponse({'error': 'User is not authorized to edit the post'}, status=403)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Edit comment if current user is owner of the comment, and make comment isEdited true
@api_view(['POST'])
def edit_comment(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		comment = Comment.objects.get(id=payload['commentId'])
		post = Post.objects.get(id=comment.post.id)
		community = Community.objects.get(id=post.community.id)
		user_connection = CommunityUserConnection.objects.get(user=request.user.id, community=community.id)

		if user_connection.type == 'owner' or user_connection.type == 'moderator' or comment.createdBy == request.user:
			comment.comment = payload['comment']
			comment.isEdited = True
			comment.save()
			return JsonResponse({'success': True, 'message': 'Comment edited successfully'}, status=200)
		return JsonResponse({'error': 'User is not authorized to edit the comment'}, status=403)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


# Get top 3 active (sorted by post count) public communities and 3 promoted communities (newest 3 communities that is not included in active communities).
@api_view(['POST'])
def get_top_communities(request):
	if request.method == 'POST':
		# Get all communities and then post count of communities then sort them by post count and get the top 3
		communities = Community.objects.all()

		communities_data = []
		if communities is not None:
			for community in communities:
				community.post_count = Post.objects.filter(community=community.id).count()
				communities_data.append(community)


		# Filter archived communities
		communities_data = [community for community in communities_data if not community.archived]

		active_communities = sorted(communities_data, key=lambda x: x.post_count, reverse=True)[:3]

		active_communities_data = []
		for community in active_communities:
			active_communities_data.append({
				'id': community.id,
				'name': community.name,
				'mainImage': community.mainImage,
				'description': community.description,
				'isPrivate': community.isPrivate,
				'postCount': community.post_count
			})

		# Get the newes 3 communities from communities
		not_active_communities = [community for community in communities_data if community not in active_communities]

		promoted_communities = sorted(not_active_communities, key=lambda x: x.createdAt, reverse=True)[:3]

		promoted_communities_data = []
		for community in promoted_communities:
			promoted_communities_data.append({
				'id': community.id,
				'name': community.name,
				'mainImage': community.mainImage,
				'description': community.description,
				'isPrivate': community.isPrivate,
				'postCount': community.post_count
			})

		response_data = {
			'success': True,
			'data': {
				'activeCommunities': active_communities_data,
				'promotedCommunities': promoted_communities_data
			}
		}
		return JsonResponse(response_data, status=200)


# Get all communities that user is owner of
@api_view(['POST'])
def get_owned_communities(request):
	if request.method == 'POST':
		connections = CommunityUserConnection.objects.filter(Q(user=request.user.id) & Q(type='owner'))
		communities_data = []

		for connection in connections:
			communities_data.append({
				'id': connection.community.id,
				'name': connection.community.name,
				'mainImage': connection.community.mainImage,
				'archived': connection.community.archived
			})

		# Filter out the archived communities
		communities_data = [community for community in communities_data if not community['archived']]

		response_data = {
			'success': True,
			'data': communities_data
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Archive community if current user is owner of the community
@api_view(['POST'])
def archive_community(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community = Community.objects.get(id=payload['communityId'])
		user_connection = CommunityUserConnection.objects.get(user=request.user.id, community=community.id)

		if user_connection.type == 'owner':
			community.archived = True
			community.save()
			return JsonResponse({'success': True, 'message': 'Community archived successfully'}, status=200)
		return JsonResponse({'error': 'User is not authorized to archive the community'}, status=403)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Add isDeleted true to the template if current user is owner or moderator of the template
@api_view(['POST'])
def delete_template(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		template = Template.objects.get(id=payload['templateId'])
		community = Community.objects.get(id=template.community.id)
		user_connection = CommunityUserConnection.objects.get(user=request.user.id, community=community.id)

		if user_connection.type == 'owner' or user_connection.type == 'moderator':
			template.isDeleted = True
			template.save()
			return JsonResponse({'success': True, 'message': 'Template deleted successfully'}, status=200)
		return JsonResponse({'error': 'User is not authorized to delete the template'}, status=403)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Get all not archived communities and all users
@api_view(['POST'])
def get_main_search(request):
	if request.method == 'POST':
		communities = Community.objects.all()
		users = User.objects.all()

		communities_data = []
		for community in communities:
			communities_data.append({
				'id': community.id,
				'name': community.name,
				'archived': community.archived,
			})

		# Filter out the archived communities
		communities_data = [community for community in communities_data if not community['archived']]

		users_data = []
		for user in users:
			users_data.append({
				'id': user.id,
				'username': user.username
			})

		response_data = {
			'success': True,
			'data': {
				'communities': communities_data,
				'users': users_data
			}
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def badges(request):
	if request.method == 'GET':
		if 'communityId' not in request.GET:
			return JsonResponse({'message': 'No community provided'}, status=400)
		community = Community.objects.get(id=request.GET['communityId'])
		badges_data = Badge.objects.filter(Q(community=community.id))

		badges_data = BadgeSerializer(badges_data, many=True).data
		response_data = {
			'success': True,
			'data': badges_data
		}
		return JsonResponse(response_data, status=200)


	elif request.method == 'POST':
		payload = JSONParser().parse(request)
		if 'communityId' not in payload:
			return JsonResponse({'error': 'No community'}, status=400)
		community = Community.objects.get(id=payload['communityId'])
		user_connection = CommunityUserConnection.objects.get(user=request.user.id, community=community.id)
		if user_connection.type != 'owner':
			return JsonResponse({'error': 'User is not authorized to create a badge for the community'}, status=403)
		badge_data = {
			'name': payload['name'],
			'description': payload['description'],
			'image': payload['image'] if 'image' in payload else None,
			'community': payload['communityId'],
			'type': payload['type'],
			'criteria': payload['criteria'] if 'criteria' in payload else None
		}
		badge_serializer = BadgeSerializer(data=badge_data)
		if badge_serializer.is_valid():
			badge=badge_serializer.save()
			log_community_activity(request.user, payload['communityId'], 'create_badge', {'badgeId':badge.id,'Badge Name': badge_serializer.data['name'], 'Badge Description': badge_serializer.data['description']})
			check_and_award_badges(request.user, payload['communityId'])
			response_data = {
				'success': True,
				'data': {
					'id': badge_serializer.data['id']
				}
			}
			return JsonResponse(response_data, status=201)
		return JsonResponse(badge_serializer.errors, status=400)
	elif request.method == 'PUT':
		payload = JSONParser().parse(request)
		badge = Badge.objects.get(id=payload['badgeId'])
		if badge.community:
			community = Community.objects.get(id=badge.community.id)
			user_connection = CommunityUserConnection.objects.get(user=request.user.id, community=community.id)
			if user_connection.type != 'owner':
				return JsonResponse({'error': 'User is not authorized to update the badge for the community'}, status=403)
		badge.name = payload['name']
		badge.description = payload['description']
		badge.image = payload['image']
		badge.criteria = payload['criteria'] if 'criteria' in payload else None
		badge.save()
		return JsonResponse({'success': True, 'message': 'Badge updated successfully'}, status=200)
	elif request.method == 'DELETE':
		"delete a badge"
		payload = JSONParser().parse(request)
		badge = Badge.objects.get(id=payload['badgeId'])
		if badge.community:
			community = Community.objects.get(id=badge.community.id)
			user_connection = CommunityUserConnection.objects.get(user=request.user.id, community=community.id)
			if user_connection.type != 'owner':
				return JsonResponse({'error': 'User is not authorized to delete the badge for the community'}, status=403)
		badge.delete()
		return JsonResponse({'success': True, 'message': 'Badge deleted successfully'}, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def user_badges(request):
	if request.method == 'GET':
		badges = UserBadge.objects.filter(user=request.user)
		badges_data = []
		for badge in badges:
			badges_data.append({
				'id': badge.id,
				'badge': badge.badge.id,
				'createdAt': badge.createdAt
			})

		response_data = {
			'success': True,
			'data': badges_data
		}
		return JsonResponse(response_data, status=200)
	elif request.method == 'POST':
		payload = JSONParser().parse(request)
		user = User.objects.get(id=payload['username'])
		badge_data = {
			'user': payload['username'],
			'badge': payload['badgeId']
		}
		if UserBadge.objects.filter(user_id=payload['username'], badge_id=payload['badgeId']).exists():
			return JsonResponse({'error': 'User already has this badge'}, status=400)
		# return JsonResponse(badge_data)
		badge_serializer = UserBadgeSerializer(data=badge_data)
		if badge_serializer.is_valid():
			badge_serializer.save()
			# get all user badges
			badges = UserBadge.objects.filter(user=user)
			response_data = {
				'success': True,
				'data': UserBadgeSerializer(badges, many=True).data
			}
			return JsonResponse(response_data, status=201)
		return JsonResponse(badge_serializer.errors, status=400)
	elif request.method == 'PUT':
		"update a badge of the user"
		payload = JSONParser().parse(request)
		badge = UserBadge.objects.get(id=payload['userBadgeId'])
		badge.badge = Badge.objects.get(id=payload['badgeId'])
		badge.save()
		return JsonResponse({'success': True, 'message': 'User badge updated successfully'}, status=200)
	elif request.method == 'DELETE':
		"delete a badge of the user"
		payload = JSONParser().parse(request)
		badge = UserBadge.objects.get(id=payload['userBadgeId'])
		badge.delete()
		return JsonResponse({'success': True, 'message': 'User badge deleted successfully'}, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)



def meets_badge_criteria(user, community, criteria):
	# Calculate the date one year ago from today
	one_year_ago = timezone.now() - datetime.timedelta(days=365)

	# Fetch counts based on user and community within the last year
	user_posts_count = Post.objects.filter(createdBy=user, community=community, createdAt__gte=one_year_ago).count()
	user_comments_count = Comment.objects.filter(createdBy=user, post__community=community, createdAt__gte=one_year_ago).count()
	followed_count = get_followed_count_in_community(user, community)
	user_templates_count = Template.objects.filter(createdBy=user, community=community, createdAt__gte=one_year_ago).count()
	user_likes_count = PostLike.objects.filter(post__createdBy=user, post__community=community, direction=True, createdAt__gte=one_year_ago).count()

	# Function to validate non-empty and non-zero criteria
	def is_valid(value):
		return value not in ("", None) and value > 0

	# Handle single condition (a dict like {"like_count": 5})
	if isinstance(criteria, dict):
		if 'post_count' in criteria and is_valid(criteria['post_count']) and criteria['post_count'] > user_posts_count:
			return False
		if 'comment_count' in criteria and is_valid(criteria['comment_count']) and criteria['comment_count'] > user_comments_count:
			return False
		if 'follower_count' in criteria and is_valid(criteria['follower_count']) and criteria['follower_count'] > followed_count:
			return False
		if 'template_count' in criteria and is_valid(criteria['template_count']) and criteria['template_count'] > user_templates_count:
			return False
		if 'like_count' in criteria and is_valid(criteria['like_count']) and criteria['like_count'] > user_likes_count:
			return False
		return True

	# Handle multiple conditions (criteria as a list of dictionaries)
	if isinstance(criteria, list):
		for criterion in criteria:
			# Check and ignore invalid or zero conditions
			if 'post_count' in criterion and is_valid(criterion['post_count']) and criterion['post_count'] > user_posts_count:
				return False
			if 'comment_count' in criterion and is_valid(criterion['comment_count']) and criterion['comment_count'] > user_comments_count:
				return False
			if 'follower_count' in criterion and is_valid(criterion['follower_count']) and criterion['follower_count'] > followed_count:
				return False
			if 'template_count' in criterion and is_valid(criterion['template_count']) and criterion['template_count'] > user_templates_count:
				return False
			if 'like_count' in criterion and is_valid(criterion['like_count']) and criterion['like_count'] > user_likes_count:
				return False
		# If no condition fails, all are satisfied
		return True

	# Return False if criteria is invalid (neither dict nor list)
	return False




from django.db.models import Q

def get_followed_count_in_community(user, community):
	# Get all users in the community
	community_users = CommunityUserConnection.objects.filter(community=community).values_list('user', flat=True)

	# Count the number of community members followed by the user
	followed_count = UserFollowConnection.objects.filter(
		follower=user,
		followee__in=community_users  # Filter followees to be within community members
	).count()

	return followed_count


def check_and_award_badges(user, community_id):
	try:
		print(f"Checking badges for user: {user.id} in community: {community_id}")
		community = Community.objects.get(id=community_id)
		print(f"Community found: {community.name}")
		badges = Badge.objects.filter(community=community.id, type='automatic')
		print(f"Found {len(badges)} badges for community {community.name}")
		awarded_badges_data = []

		for badge in badges:
			print(f"Processing badge: {badge.name}")
			if UserBadge.objects.filter(user=user, badge=badge).exists():
				print(f"User already has badge: {badge.name}")
				continue

			if meets_badge_criteria(user, community, badge.criteria):
				print(f"User meets criteria for badge: {badge.name}")
				user_badge = UserBadge.objects.create(user=user, badge=badge)
				awarded_badges_data.append({
					'id': badge.id,
					'name': badge.name,
					'description': badge.description,
					'image': badge.image,
					'awardedAt': user_badge.createdAt
				})
				log_community_activity(user=user, community_id=community.id, action='earn_badge', target={'badgeId': badge.id, 'Badge Name': badge.name, 'Badge Description': badge.description})

			else:
				print(f"User does not meet criteria for badge: {badge.name}")

		print(f"Awarded badges: {awarded_badges_data}")
		return awarded_badges_data

	except Exception as e:
		print(f"Error in check_and_award_badges: {str(e)}")
		raise



def create_default_badges_for_community(com):
	"""
	Create default badges for a community and log the process.
	"""
	print(f"Starting badge creation for community: (ID: {com.id})")

	default_badges = [
		{
			'name': f"{com.name} - Post Master",
			'description': 'Awarded for creating a specific number of posts.',
			'type': 'automatic',
			'criteria': {'post_count': 5},
			'community': com.id
		},
		{
			'name': f"{com.name} - Commentator",
			'description': 'Awarded for creating a specific number of comments.',
			'type': 'automatic',
			'criteria': {'comment_count': 5},
			'community': com.id
		},
		{
			'name': f"{com.name} - Social Butterfly",
			'description': 'Awarded for gaining a specific number of followers.',
			'type': 'automatic',
			'criteria': {'follower_count': 5},
			'community': com.id
		},
		{
			'name': f"{com.name} - Template Creator",
			'description': 'Awarded for creating a specific number of templates.',
			'type': 'automatic',
			'criteria': {'template_count': 5},
			'community': com.id
		},
		{
			'name': f"{com.name} - Appreciated",
			'description': 'Awarded for receiving a specific number of likes.',
			'type': 'automatic',
			'criteria': {'like_count': 5},
			'community': com.id
		}
	]

	created_badges = []
	for badge_data in default_badges:
		print(f"Creating badge: {badge_data['name']} with criteria: {badge_data['criteria']}")
		badge_serializer = BadgeSerializer(data=badge_data)
		if badge_serializer.is_valid():
			badge = badge_serializer.save()
			created_badges.append(badge)
			print(f"Badge '{badge.name}' created successfully (ID: {badge.id}).")
		else:
			error_message = f"Failed to create badge '{badge_data['name']}': {badge_serializer.errors}"
			print(error_message)
			raise ValueError(error_message)


	return created_badges





@api_view(['POST'])
def get_recommended_users(request):
	if request.method == 'POST':

		# The users that like the posts of the current user
		current_user_posts = Post.objects.filter(createdBy=request.user).values_list('id', flat=True)
		users_who_like_posts_of_the_current_user = PostLike.objects.filter(
			post__in=current_user_posts).values_list('createdBy', flat=True)

		# The users that like the comments of the current user
		current_user_comments = Comment.objects.filter(createdBy=request.user).values_list('id', flat=True)
		users_who_like_comments_of_the_current_user = CommentLike.objects.filter(
			comment__in=current_user_comments).values_list('createdBy', flat=True)

		# The users that the current user likes their posts
		posts_that_current_user_likes = PostLike.objects.filter(createdBy=request.user).values_list('post', flat=True)
		authors_of_posts_that_current_user_likes = Post.objects.filter(
			id__in=posts_that_current_user_likes).values_list('createdBy', flat=True)

		# The users that the current user likes their comments
		comments_that_current_user_likes = CommentLike.objects.filter(createdBy=request.user).values_list('comment', flat=True)
		authors_of_comments_that_current_user_likes = Comment.objects.filter(
			id__in=comments_that_current_user_likes).values_list('createdBy', flat=True)

		# The users that the current user comments on their posts
		posts_that_current_user_comments = Comment.objects.filter(createdBy=request.user).values_list('post', flat=True)
		authors_of_posts_that_current_user_comments = Post.objects.filter(id__in=posts_that_current_user_comments).values_list('createdBy', flat=True)

		# The users who comment on posts of the current user
		authors_of_comments_in_current_user_posts = Comment.objects.filter(id__in=current_user_posts).values_list('createdBy', flat=True)

		# Add all interacted users into a set class
		interacted_users = set(
			list(users_who_like_posts_of_the_current_user) + list(users_who_like_comments_of_the_current_user) + list(authors_of_posts_that_current_user_likes) + list(authors_of_comments_that_current_user_likes) + list(authors_of_posts_that_current_user_comments) + list(authors_of_comments_in_current_user_posts))

		already_followed_users = set(
			UserFollowConnection.objects.filter(follower=request.user).values_list('followee', flat=True))

		recommended_users = interacted_users - already_followed_users
		recommended_users_table = User.objects.filter(id__in=recommended_users)

		users_list = []

		for user in recommended_users_table:
			users_list.append({
				'id': user.id,
				'username': user.username,
				'profile_pic': None
			})

		response_data = {
			'success': True,
			'data': users_list
		}
		return JsonResponse(response_data, status=200)

	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


def log_community_activity(user, community_id, action, target=None):
	activity = CommunityActivity.objects.create(
            user=user,
            community_id=community_id,
            action=action,
            target=json.dumps(target) if target else None
        )

@api_view(['POST'])
def get_community_activity_feed(request):
    try:
        # Parse community_id from request payload
        payload = JSONParser().parse(request)
        community_id = payload.get('community_id')

        if not community_id:
            return JsonResponse({'success': False, 'error': 'community_id is required'}, status=400)

        # Fetch the last 10 actions for the given community
        activities = CommunityActivity.objects.filter(community_id=community_id).order_by('-createdAt')[:10]

        # Prepare response data
        activity_data = [
            {
                'user': activity.user.username,
                'action': activity.get_action_display(),
                'target': json.loads(activity.target) if activity.target else None,
				'createdAt': activity.createdAt.isoformat()  # Include the createdAt timestamp in ISO format
            }
            for activity in activities
        ]

        return JsonResponse({'success': True, 'data': activity_data}, status=200)

    except Exception as e:
        return JsonResponse({'success': False, 'error': str(e)}, status=500)




