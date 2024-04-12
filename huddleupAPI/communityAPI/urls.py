from django.conf.urls import url
from communityAPI import views

urlpatterns = [
	url(r'create-community', views.create_community),
	url(r'get-community-info', views.get_community_info),
	url(r'templates/create-template', views.create_template),
]