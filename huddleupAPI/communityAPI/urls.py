from django.conf.urls import url
from communityAPI import views

urlpatterns = [
	url(r'create-community', views.create_community),
	url(r'get-community-info', views.get_community_info),
	url(r'get-community-posts', views.get_community_posts),
	url(r'templates/create-template', views.create_template),
	url(r'templates/get-templates', views.get_templates),
	url(r'templates/get-template', views.get_template),
	url(r'create-post', views.create_post),
	url(r'add-comment', views.add_comment),
	url(r'get-post-comments', views.get_post_comments),
	url(r'like-post', views.like_post),
	url(r'like-comment', views.like_comment)
]