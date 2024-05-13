from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q


from authAPI.models import User
from communityAPI.models import Community, CommunityUserConnection, Template, Post, Comment, PostLike, CommentLike, CommunityInvitation, UserFollowConnection
from communityAPI.serializers import CommunitySerializer, CommunityUserConnectionSerializer, TemplateSerializer, PostSerializer, CommentSerializer, PostLikeSerializer, CommentLikeSerializer, CommunityInvitationSerializer, UserFollowConnectionSerializer

import json
import datetime


# Create your views here.
@csrf_exempt
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


# Get users that has connection with type 'member' of the comminty
@csrf_exempt
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

#Get users that banned from community
@csrf_exempt
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

# Get users that has connection with type 'moderator' of the comminty
@csrf_exempt
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

# Get users that has connection with type 'owner' of the comminty
@csrf_exempt
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
@csrf_exempt
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
		return JsonResponse({'success': True, 'message': 'Moderator assigned/unassigned successfully'}, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


@csrf_exempt
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

		response_data = {
			'success': True,
			'data': {
				'name': community.name,
				'description': community.description,
				'isPrivate': community.isPrivate,
				'mainImage': community.mainImage,
				'memberType': member_type,
			}
		}

		return JsonResponse(response_data, status=200)
	else:
		return JsonResponse({'error': 'Invalid request method'}, status=400)

# gets all communites that user is either member or moderator
@csrf_exempt
def get_user_communities(request):
	if request.method == 'POST':
		connections = CommunityUserConnection.objects.filter(user=request.user.id)
		communities_data = []

		for connection in connections:
			communities_data.append({
				'id': connection.community.id,
				'name': connection.community.name,
				'mainImage': connection.community.mainImage,
				'description': connection.community.description,
				'isPrivate': connection.community.isPrivate,
				'type': connection.type
			})

		response_data = {
			'success': True,
			'data': communities_data
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# If community is not private and user is not member of the community, add user to the community
@csrf_exempt
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
			return JsonResponse({'success': True, 'message': 'User added to the community successfully'}, status=201)
		return JsonResponse(communityUserConnection_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# If community is private and user is member or moderator of the community, remove user from the community (owners cant leave the community)
@csrf_exempt
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
# username and communityId in request
@csrf_exempt
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
			return JsonResponse({'success': True, 'message': 'Invitation created successfully'}, status=201)
		return JsonResponse(invitation_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


# If community is private and user is owner or moderator of the community, get all invitations of the community
@csrf_exempt
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

@csrf_exempt
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
@csrf_exempt
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

@csrf_exempt
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

		posts = posts.order_by('-createdAt')

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

			posts_data.append({
				'id': post.id,
				'username': post.createdBy.username,
				'createdAt': post.createdAt,
				'rowValues': post.rowValues,
				'templateId': post.template.id,
				'likeCount': like_count,
				'dislikeCount': dislike_count,
				'liked': likedByUser,
				'disliked': dislikedByUser,
				'isFollowing': isFollowing
			})

		response_data = {
			'success': True,
			'data': posts_data
		}
		return JsonResponse(response_data, status=200)

	return JsonResponse({'error': 'Method Not Allowed'}, status=405)



# Template related views
@csrf_exempt
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
			template_serializer.save()

			response_data = {
				'success': True,
				'data': {
					'id': template_serializer.data['id']
				}
			}
			return JsonResponse(response_data, status=201)
		return JsonResponse(template_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

@csrf_exempt
def get_templates(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		templates = Template.objects.filter(community=payload['communityId'])
		templates_data = []
		for template in templates:
			templates_data.append({
				'id': template.id,
				'templateName': template.templateName,
				'rows': template.rows
			})
		response_data = {
			'success': True,
			'data': templates_data
		}
		return JsonResponse(response_data, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

@csrf_exempt
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

# Post related views
@csrf_exempt
def create_post(request):
	if request.method == 'POST':
		request_data = JSONParser().parse(request)

		post_data = {
				'createdBy': request.user.id,
				'community': request_data['communityId'],
				'template': request_data['templateId'],
				'rowValues': request_data['rowValues']
		}
		post_serializer = PostSerializer(data=post_data)
		if post_serializer.is_valid():
			post_serializer.save()

			response_data = {
				'success': True,
				'data': {
					'id': post_serializer.data['id']
				}
			}
			return JsonResponse(response_data, status=201)
		return JsonResponse(post_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


# Comment related views
@csrf_exempt
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
			comment_serializer.save()

			response_data = {
				'success': True,
				'data': {
					'id': comment_serializer.data['id']
				}
			}
			return JsonResponse(response_data, status=201)
		return JsonResponse(comment_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

#Get comments of a post with like and unlike counts
@csrf_exempt
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
				'createdAt': comment.createdAt,
				'comment': comment.comment,
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


@csrf_exempt
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
				return JsonResponse({'success': True, 'message': 'Like added successfully'}, status=201)
			else:
				return JsonResponse(like_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

@csrf_exempt
def like_comment(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		comment_id = payload.get('commentId')
		direction = payload.get('direction')

		try:
			comment = Comment.objects.get(id=comment_id)
		except Comment.DoesNotExist:
			return JsonResponse({'error': 'Comment not found'}, status=404)

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
				like_serializer.save()
				return JsonResponse({'success': True, 'message': 'Like added successfully'}, status=201)
			else:
				return JsonResponse(like_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


# Follor if user is not followed yet, unfollow if user is already followed
@csrf_exempt
def follow_user(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		followee = User.objects.get(username=payload['username'])

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
				return JsonResponse({'success': True, 'message': 'User followed successfully'}, status=201)
			else:
				return JsonResponse(follow_serializer.errors, status=400)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)

# Get all users that user is following and followers of the user
@csrf_exempt
def get_user_connections(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		followers = UserFollowConnection.objects.filter(followee=request.user)
		followers_data = []
		for follower in followers:
			followers_data.append({
				'username': follower.follower.username
			})

		following = UserFollowConnection.objects.filter(follower=request.user)
		following_data = []
		for followee in following:
			following_data.append({
				'username': followee.followee.username
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
@csrf_exempt
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
		return JsonResponse({'success': True, 'message': 'User banned/unbanned successfully'}, status=200)
	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


# Delete post if current user is owner of the post or owner or moderator of the community
@csrf_exempt
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
@csrf_exempt
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







