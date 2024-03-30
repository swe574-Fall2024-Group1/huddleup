from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from authAPI.models import User
from authAPI.serializers import UserSerializer

# Create your views here.
@csrf_exempt
def register(request):
	if request.method == 'POST':
		user_data = JSONParser().parse(request)
		user_serializer = UserSerializer(data=user_data)
		if user_serializer.is_valid():
			user_serializer.save()
			return JsonResponse(user_serializer.data, status=201)
		return JsonResponse(user_serializer.errors, status=400)
