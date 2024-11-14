from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from taggit.models import Tag
from rest_framework.response import Response


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
