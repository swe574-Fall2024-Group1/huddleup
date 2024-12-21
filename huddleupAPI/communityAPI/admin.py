from django.contrib import admin
from .models import Community, Post, UserTagUsage, CommunityTagUsage, UserCommunityRecommendation, TagSemanticMetadata

admin.site.register(Community)
admin.site.register(Post)
admin.site.register(UserTagUsage)
admin.site.register(CommunityTagUsage)
admin.site.register(UserCommunityRecommendation)
admin.site.register(TagSemanticMetadata)
