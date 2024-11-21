from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from taggit.models import Tag
from rest_framework.response import Response
from .models import UserRecommendation


class TagList(ListAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        search_param = self.request.query_params.get("search")
        if not search_param:
            return Tag.objects.none()
        else:
            return Tag.objects.filter(name__istartswith=search_param)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        response = list(queryset.values_list("name", flat=True))
        return Response(response)


class RecCommunitiesList(ListAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserRecommendation.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        response = [{"comm_name": x.community.name, "comm_id": x.community.id, "comm_image": x.community.mainImage} for x in queryset]
        return Response(response)
