from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from authAPI.models import User
from authAPI.serializers import UserRegisterSerializer
from authAPI.sessionManager import SessionManager
from rest_framework.generics import CreateAPIView
from rest_framework import permissions


class CreateUserView(CreateAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegisterSerializer


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
