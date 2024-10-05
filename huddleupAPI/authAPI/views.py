from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from authAPI.models import User
from authAPI.serializers import UserRegisterSerializer, UserSerializer
from authAPI.sessionManager import SessionManager
from rest_framework.generics import CreateAPIView
from rest_framework import permissions
from rest_framework import views
from django.contrib.auth import authenticate


class CreateUserView(CreateAPIView):

    permission_classes = [permissions.AllowAny]
    serializer_class = UserRegisterSerializer


class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]
    http_method_names = ['post']

    def post(self, request):
        data = request.data

        email = data.get('email', None)
        password = data.get('password', None)

        user = authenticate(username=email, password=password)

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


class UserInfoView(views.APIView):
    http_method_names = ['get']

    def get(self, request):
        return JsonResponse(UserSerializer(request.user).data)
