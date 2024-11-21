import numpy as np
from collections import defaultdict
from django.core.management.base import BaseCommand
from authAPI.models import User
from communityAPI.models import Community, UserRecommendation, UserTagUsage, CommunityTagUsage, CommunityUserConnection


class Command(BaseCommand):
    help = 'Precompute community recommendations for active users'

    def calculate_recommendations(self, user):
        # Fetch user's post tags
        user_post_tags = defaultdict(int)
        for user_tag in UserTagUsage.objects.filter(user=user):
            user_post_tags[user_tag.tag.name] += user_tag.usage_count

        # Fetch user's interest tags and give them a higher weight
        user_interest_tags = {tag.name for tag in user.tags.all()}
        interest_weight = 2  # Adjust the weight as needed

        # Combine the tags with weights
        user_combined_tags = defaultdict(int, user_post_tags)
        for tag in user_interest_tags:
            user_combined_tags[tag] += interest_weight

        recommendations = []

        # Compare with each community
        comms_to_exclude = [x.community.id for x in CommunityUserConnection.objects.filter(user=user)]
        for community in Community.objects.exclude(id__in=comms_to_exclude):
            community_tags = defaultdict(int)
            for community_tag in CommunityTagUsage.objects.filter(community=community):
                community_tags[community_tag.tag.name] += community_tag.usage_count

            # Align tag vectors
            all_tags = set(user_combined_tags.keys()).union(community_tags.keys())
            user_vec = np.array([user_combined_tags.get(tag, 0) for tag in all_tags])
            community_vec = np.array([community_tags.get(tag, 0) for tag in all_tags])

            # Compute cosine similarity
            similarity = np.dot(user_vec, community_vec) / (np.linalg.norm(user_vec) * np.linalg.norm(community_vec))
            recommendations.append((community, similarity))

        # Sort communities by similarity
        recommendations = sorted(recommendations, key=lambda x: x[1], reverse=True)
        return recommendations[:10]  # Top 10 recommendations

    def handle(self, *args, **kwargs):
        active_users = User.objects.filter(is_active=True)
        for user in active_users:
            recommendations = self.calculate_recommendations(user)  # Get recommended communities
            # Save recommendations to the database
            UserRecommendation.objects.filter(user=user).delete()  # Clear old recommendations
            for community, score in recommendations:
                if not np.isnan(score):
                    UserRecommendation.objects.create(user=user, community=community, score=score)
        self.stdout.write("Community recommendations updated successfully.")
