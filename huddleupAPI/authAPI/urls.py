from django.conf.urls import url
from authAPI import views

urlpatterns = [
	url(r'register', views.register),
	url(r'login', views.login),
	url(r'get-user-info', views.get_user_info),
]