from django.contrib import admin
from .models import Community, Post, UserTagUsage, CommunityTagUsage, UserRecommendation, TagSemanticMetadata

admin.site.register(Community)
admin.site.register(Post)
admin.site.register(UserTagUsage)
admin.site.register(CommunityTagUsage)
admin.site.register(UserRecommendation)
admin.site.register(TagSemanticMetadata)
