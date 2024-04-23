from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from djongo.exceptions import SQLDecodeError


from communityAPI.models import Community, CommunityUserConnection, Template, Post, Comment, PostLike, CommentLike
from communityAPI.serializers import CommunitySerializer, CommunityUserConnectionSerializer, TemplateSerializer, PostSerializer, CommentSerializer, PostLikeSerializer, CommentLikeSerializer


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

@csrf_exempt
def get_community_info(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		community = Community.objects.get(id=payload['communityId'])
		connection = CommunityUserConnection.objects.get(user=request.user.id, community=community.id)
		if connection is None:
			response_data = {
				'success': False,
				'data': {
					'name': community.name,
					'description': community.description,
					'isPrivate': community.isPrivate,
					'memberType': 'notMember',
				}
			}
		else:
			response_data = {
				'success': True,
				'data': {
					'name': community.name,
					'description': community.description,
					'isPrivate': community.isPrivate,
					'memberType': connection.type,
				}
			}
		return JsonResponse(response_data, status=200)

# Get posts of a community with like and dislike counts
@csrf_exempt
def get_community_posts(request):
	if request.method == 'POST':
		payload = JSONParser().parse(request)
		posts = Post.objects.filter(community=payload['communityId'])
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




