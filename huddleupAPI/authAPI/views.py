from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from authAPI.models import User
from authAPI.serializers import UserSerializer
from authAPI.sessionManager import SessionManager


@csrf_exempt
def register(request):
	if request.method == 'POST':

		user_data = JSONParser().parse(request)
		username = user_data.get('username', None)
		password = user_data.get('password', None)

		# Make username lowercase
		user_data['username'] = username.lower()

		if not username or not password:
			return JsonResponse({'error': 'Username and password are required'}, status=400)

		if User.objects.filter(username=username).exists():
			return JsonResponse({'error': 'Username already exists'}, status=400)

		user_serializer = UserSerializer(data=user_data)
		if user_serializer.is_valid():
			user_serializer.save()
			response_data = {
				'success': True,
				'data': user_serializer.data
			}
			return JsonResponse(response_data, status=201)

	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


@csrf_exempt
def login(request):
	if request.method == 'POST':

		user_data = JSONParser().parse(request)
		username = user_data.get('username', None)
		password = user_data.get('password', None)

		user_data['username'] = username.lower()

		try:
			user = User.objects.get(username=username)
		except User.DoesNotExist:
			return JsonResponse({'error': 'Invalid username or password'}, status=400)

		if not password == user.password:
			return JsonResponse({'error': 'Invalid username or password'}, status=400)

		sessionToken = SessionManager().create_session(user.id)

		response_data = {
			'success': True,
			'data': {
				'sessionToken': sessionToken
			}
		}

		return JsonResponse(response_data, status=200)

	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


# Get username. req.user.id is the user id
@csrf_exempt
def get_user_info(request):
	if request.method == 'POST':
		user_id = request.user.id
		user = User.objects.get(id=user_id)
		user_serializer = UserSerializer(user)
		response_data = {
			'success': True,
			'data': {
				'username': user_serializer.data['username']
			}
		}
		return JsonResponse(response_data, status=200)
