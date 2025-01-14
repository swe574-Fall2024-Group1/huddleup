from django.conf.urls import url
from communityAPI import views
from communityAPI import class_views

urlpatterns = [
	url(r'create-community', views.create_community, name='create_community'),
	url(r'get-community-info', views.get_community_info, name='get_community_info'),
	url(r'get-user-communities', views.get_user_communities, name='get_user_communities'),
	url(r'get-user-profile', views.get_user_profile, name='get_user_profile'),
	url(r'get-communities', views.get_communities, name='get_communities'),
	url(r'join-community', views.join_community, name='join_community'),
	url(r'leave-community', views.leave_community, name='leave_community'),
	url(r'create-invitation', views.create_invitation, name='create_invitation'),
	url(r'cancel-invitation', views.cancel_invitation, name='cancel_invitation'),
	url(r'get-community-members', views.get_community_members, name='get_community_members'),
	url(r'get-community-banned', views.get_community_banned, name='get_community_banned'),
	url(r'get-community-moderators', views.get_community_moderators, name='get_community_moderators'),
	url(r'get-community-owners', views.get_community_owners, name='get_community_owners'),
	url(r'assign-moderator', views.assign_moderator, name='assign_moderator'),
	url(r'change-ownership', views.change_ownership, name='change_ownership'),
	url(r'get-invitations-community', views.get_invitations_by_community, name='get_invitations_by_community'),
	url(r'get-invitations-user', views.get_invitations_by_user, name='get_invitations_by_user'),
	url(r'response-invitation', views.response_invitation, name='response_invitation'),
	url(r'get-community-posts', views.get_community_posts, name='get_community_posts'),
	url(r'get-user-feed', views.get_user_feed, name='get_user_feed'),
	url(r'templates/create-template', views.create_template, name='create_template'),
	url(r'templates/get-templates', views.get_templates, name='get_templates'),
	url(r'templates/get-template', views.get_template, name='get_template'),
	url(r'templates/delete-template', views.delete_template, name='delete_template'),
	url(r'create-post', views.create_post, name='create_post'),
	url(r'add-comment', views.add_comment, name='add_comment'),
	url(r'get-post-comments', views.get_post_comments, name='get_post_comments'),
	url(r'like-post', views.like_post, name='like_post'),
	url(r'like-comment', views.like_comment, name='like_comment'),
	url(r'follow-user', views.follow_user, name='follow_user'),
	url(r'get-user-connections', views.get_user_connections, name='get_user_connections'),
	url(r'ban-user', views.ban_user, name='ban_user'),
	url(r'delete-post', views.delete_post, name='delete_post'),
	url(r'delete-comment', views.delete_comment, name='delete_comment'),
	url(r'get-post-details', views.get_post_details, name='get_post_details'),
	url(r'edit-post', views.edit_post, name='edit_post'),
	url(r'edit-comment', views.edit_comment, name='edit_comment'),
	url(r'get-top-communities', views.get_top_communities, name='get_top_communities'),
	url(r'get-owned-communities', views.get_owned_communities, name='get_owned_communities'),
	url(r'archive-community', views.archive_community, name='archive_community'),
	url(r'get-main-search', views.get_main_search, name='get_main_search'),
	url(r'badges/get-badge', views.badges, name='get_badge'),
	url(r'badges/get-badges', views.badges, name='get_badges'),
	url('badges/create-badge', views.badges, name='create_badge'),
	url(r'badges/update-badge', views.badges, name='edit_badge'),
	url(r'badges/delete-badge', views.badges, name='delete_badge'),
	url(r'badges/get-user-badges', views.user_badges, name='get_user_badges'),
	url(r'badges/assign-badge', views.user_badges, name='assign_badge'),
	url(r'badges/remove-badge', views.user_badges, name='remove_badge'),
	url(r'badges/get-badge-users', views.user_badges, name='get_badge_users'),
	url(r'tags', class_views.TagList.as_view(), name='tag_list'),
	url(r'rec-communities', class_views.RecCommunitiesList.as_view(), name='rec_communities'),
	url(r'get-recommended-users', views.get_recommended_users, name='get_recommended_users'),
    url(r'community-activity-feed', views.get_community_activity_feed, name='community_activity_feed'),
	url(r'update-user-profile', views.update_user_profile, name='update_user_profile'),
]

