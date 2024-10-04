from django.urls import path
from authAPI import views

urlpatterns = [
	path('register', views.register),
	path('login', views.login),
	path('get-user-info', views.get_user_info)
]