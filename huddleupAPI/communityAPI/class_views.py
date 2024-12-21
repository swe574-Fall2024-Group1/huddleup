import requests
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from taggit.models import Tag
from rest_framework.response import Response
from .models import UserCommunityRecommendation


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
                    {"name": result["label"], "description": result.get("description", ""), "id": result["id"]}
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

        local_tags = []

        for each in queryset:
            local_tags.append(
                {"name": each.name, "description": "", "id": str(each.id)} if not hasattr(each, "semantic_metadata") else
                {"name": each.name.split("-wdata-")[0], "id": each.semantic_metadata.wikidata_id, "description": each.semantic_metadata.description}
            )

        local_ids = [x["id"] for x in local_tags if x["id"].startswith("Q")]

        # Fetch Wikidata tags
        wikidata_tags = self.fetch_wikidata_tags(search_param)
        wikidata_tags = [x for x in wikidata_tags if x["id"] not in local_ids]

        all_tags = local_tags + wikidata_tags

        if not Tag.objects.filter(name=search_param).exists():
            all_tags.append({"name": search_param, "id": "newlocal", "description": "Add new local tag"})

        return Response(all_tags)


class RecCommunitiesList(ListAPIView):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserCommunityRecommendation.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        response = [{"comm_name": x.community.name, "comm_id": x.community.id, "comm_image": x.community.mainImage} for x in queryset]
        return Response(response)
