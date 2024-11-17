from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from authAPI.models import User
from authAPI.serializers import UserSerializer, RegisterUserSerializer
from authAPI.sessionManager import SessionManager
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes


@api_view(['POST'])
@permission_classes([AllowAny])
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

		user_serializer = RegisterUserSerializer(data=user_data)
		if user_serializer.is_valid():
			User.objects.create_user(username=user_serializer.validated_data["username"],
									 password=user_serializer.validated_data["password"])
			response_data = {
				'success': True,
				'data': user_serializer.data
			}
			return JsonResponse(response_data, status=201)

	return JsonResponse({'error': 'Method Not Allowed'}, status=405)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
	if request.method == 'POST':

		user_data = JSONParser().parse(request)
		username = user_data.get('username', None)
		password = user_data.get('password', None)

		user = authenticate(username=username, password=password)

		if user is not None:
			if user.is_active:
				sessionToken = SessionManager().create_session(user.id)
				response_data = {
					'success': True,
					'data': {
						'sessionToken': sessionToken
					}
				}
				return JsonResponse(response_data, status=200)
			else:
				return JsonResponse({"success": False, "error": "User is not active"}, status=400)
		else:
			return JsonResponse({"success": False, "error": "Authentication failure"},
								status=400)


# Get username. req.user.id is the user id
@api_view(['POST'])
def get_user_info(request):
	if request.method == 'POST':
		user_id = request.user.id
		user = User.objects.get(id=user_id)
		user_serializer = UserSerializer(user)
		response_data = {
			'success': True,
			'data': {
				'username': user_serializer.data['username'],
				'about_me': user.about_me,
				'tags': list(user.tags.values_list('name', flat=True)),
				'id': user_serializer.data['id'],
				'badges': user_serializer.data['badges']
			}
		}
		return JsonResponse(response_data, status=200)
