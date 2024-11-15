from django.conf.urls import url
from authAPI import views
from authAPI import class_views

urlpatterns = [
	url(r'register', views.register),
	url(r'login', views.login),
	url(r'get-user-info', views.get_user_info),
	url(r'profile', class_views.UpdateProfileView.as_view()),
]