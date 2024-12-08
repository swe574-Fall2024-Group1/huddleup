import requests
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
        return Tag.objects.filter(name__istartswith=search_param)

    def fetch_wikidata_tags(self, search_param):
        """
        Fetch matching tags from Wikidata using the wbsearchentities API.
        """
        url = "https://www.wikidata.org/w/api.php"
        params = {
            "action": "wbsearchentities",
            "search": search_param,
            "language": "en",
            "format": "json",
            "limit": 20
        }
        try:
            response = requests.get(url, params=params)
            if response.status_code == 200:
                data = response.json()
                return [
                    {"name": result["label"], "description": result.get("description", "")}
                    for result in data.get("search", [])
                ]
        except requests.RequestException:
            pass  # Log the error in a real-world scenario
        return []

    def list(self, request, *args, **kwargs):
        search_param = self.request.query_params.get("search")
        if not search_param:
            return Response([])

        # Fetch local tags
        queryset = self.filter_queryset(self.get_queryset())
        local_tags = list(queryset.values_list("name", flat=True))

        # Fetch Wikidata tags
        wikidata_tags = self.fetch_wikidata_tags(search_param)

        # Combine results
        response = {
            "local": local_tags if len(local_tags) else [search_param],
            "wikidata": wikidata_tags,
        }
        return Response(response)


class RecCommunitiesList(ListAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserRecommendation.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        response = [{"comm_name": x.community.name, "comm_id": x.community.id, "comm_image": x.community.mainImage} for x in queryset]
        return Response(response)
