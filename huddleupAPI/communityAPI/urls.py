from django.conf.urls import url
from communityAPI import views

urlpatterns = [
	url(r'create-community', views.create_community),
	url(r'get-community-info', views.get_community_info),
    url(r'get-user-communities', views.get_user_communities),
    url(r'join-community', views.join_community),
    url(r'leave-community', views.leave_community),
	url(r'create-invitation', views.create_invitation),
	url(r'get-community-members', views.get_community_members),
    url(r'get-community-moderators', views.get_community_moderators),
    url(r'get-community-owners', views.get_community_owners),
    url(r'assign-moderator', views.assign_moderator),
	url(r'get-invitations-community', views.get_invitations_by_community),
	url(r'get-invitations-user', views.get_invitations_by_user),
	url(r'response-invitation', views.response_invitation),
	url(r'get-community-posts', views.get_community_posts),
	url(r'templates/create-template', views.create_template),
	url(r'templates/get-templates', views.get_templates),
	url(r'templates/get-template', views.get_template),
	url(r'create-post', views.create_post),
	url(r'add-comment', views.add_comment),
	url(r'get-post-comments', views.get_post_comments),
	url(r'like-post', views.like_post),
	url(r'like-comment', views.like_comment),
    url(r'follow-user', views.follow_user)
]