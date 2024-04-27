from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.core.exceptions import ObjectDoesNotExist


from authAPI.models import User
from communityAPI.models import Community, CommunityUserConnection, Template, Post, Comment, PostLike, CommentLike, CommunityInvitation
from communityAPI.serializers import CommunitySerializer, CommunityUserConnectionSerializer, TemplateSerializer, PostSerializer, CommentSerializer, PostLikeSerializer, CommentLikeSerializer, CommunityInvitationSerializer


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


@csrf_exempt
def assign_moderator(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community = Community.objects.get(id=payload['communityId'])
		user = User.objects.get(username=payload['username'])
		connection = CommunityUserConnection.objects.get(user=user.id, community=community.id)
		connection.type = 'moderator'
		connection.save()
		return JsonResponse({'success': True, 'message': 'Moderator assigned successfully'}, status=200)
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

		# Filter posts by community and order by createdAt (latest to oldest)
		posts = Post.objects.filter(community=community_id).order_by('-createdAt')

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

			posts_data.append({
				'id': post.id,
				'username': post.createdBy.username,
				'createdAt': post.createdAt,
				'rowValues': post.rowValues,
				'templateId': post.template.id,
				'likeCount': like_count,
				'dislikeCount': dislike_count,
				'liked': likedByUser,
				'disliked': dislikedByUser
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






