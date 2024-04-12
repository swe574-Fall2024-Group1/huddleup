from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from communityAPI.models import Community, CommunityUserConnection
from communityAPI.serializers import CommunitySerializer, CommunityUserConnectionSerializer


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

# Template related views


