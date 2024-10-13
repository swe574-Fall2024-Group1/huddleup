from django.contrib import admin
from .models import Community, CommunityUserConnection

admin.site.register(Community)
admin.site.register(CommunityUserConnection)

