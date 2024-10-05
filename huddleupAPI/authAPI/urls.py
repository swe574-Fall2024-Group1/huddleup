from django.urls import path
from authAPI import views

urlpatterns = [
	path('register', views.CreateUserView.as_view(), name='register'),
	path('login', views.LoginView.as_view(), name='login'),
	path('get-user-info', views.UserInfoView.as_view(), name='get-user-info')
]
