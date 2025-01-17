import numpy as np
import requests
import time
from collections import defaultdict
from django.core.management.base import BaseCommand
from authAPI.models import User
from communityAPI.models import Post, Community, UserCommunityRecommendation, UserUserRecommendation, UserTagUsage, CommunityTagUsage, CommunityUserConnection, TagSemanticMetadata, UserFollowConnection
from taggit.models import Tag
from django.core.cache import cache

class Command(BaseCommand):
    help = 'Precompute community recommendations for active users'

    wikidata_url = "https://www.wikidata.org/w/api.php?action=wbgetentities&ids={}&format=json&props=claims"

    def update_tag_metadata(self):
        for each in Tag.objects.all():
            if hasattr(each, "semantic_metadata"):
                if not each.semantic_metadata.semantic_data:
                    try:
                        req = requests.get(self.wikidata_url.format(each.semantic_metadata.wikidata_id))
                        time.sleep(1)
                        if req.status_code == 200:
                            each.semantic_metadata.semantic_data = req.json()["entities"][each.semantic_metadata.wikidata_id]["claims"]
                            each.semantic_metadata.save()
                    except Exception as e:
                        print(str(e))

    def get_all_ancestors(self, tag):
        """
        Return a set of all ancestor Q-IDs (including the tag's own Q-ID) for the given tag.
        This function uses a recursive approach, with caching to prevent repeated database hits.
        """

        def recurse(qid):
            # Given a Q-ID, find its ancestors
            try:
                tag_meta = TagSemanticMetadata.objects.select_related('tag').get(wikidata_id=qid)
            except TagSemanticMetadata.DoesNotExist:
                return  # no further ancestors

            sem_data = tag_meta.semantic_data
            if not sem_data or 'P279' not in sem_data:
                return

            for statement in sem_data['P279']:
                mainsnak = statement.get('mainsnak', {})
                datavalue = mainsnak.get('datavalue', {})
                value = datavalue.get('value', {})
                superclass_qid = value.get('id')
                if superclass_qid and superclass_qid not in ancestors:
                    ancestors.add(superclass_qid)
                    recurse(superclass_qid)

        cache_key = f"tag_ancestors_{tag.pk}"
        ancestors = cache.get(cache_key)
        if ancestors is not None:
            return ancestors

        ancestors = set()
        # Include the tag's own Q-ID if it exists in TagSemanticMetadata
        if hasattr(tag, 'semantic_metadata') and tag.semantic_metadata.wikidata_id:
            ancestors.add(tag.semantic_metadata.wikidata_id)
            qid = tag.semantic_metadata.wikidata_id
            recurse(qid)

        cache.set(cache_key, ancestors, 3600)  # Cache for an hour
        return ancestors

    def get_user_interest_profile(self, user):
        user_tags = user.tags.all()
        user_posts = Post.objects.filter(createdBy=user.id)
        for post in user_posts:
            user_tags = user_tags.union(post.tags.all())

        interest = set()
        for tag in user_tags:
            ancestors = self.get_all_ancestors(tag)
            interest.update(ancestors)
        return interest

    def get_community_tag_profile(self, community):
        community_posts = Post.objects.filter(community=community)
        community_tags = set()
        for post in community_posts:
            community_tags.update(post.tags.all())

        community_profile = set()
        for tag in community_tags:
            community_profile.update(self.get_all_ancestors(tag))
        return community_profile

    def get_non_member_communities(self, user):
        member_community_ids = CommunityUserConnection.objects.filter(user=user).values_list('community_id', flat=True)
        return Community.objects.exclude(id__in=member_community_ids)

    def recommend_communities(self, user):
        user_interest = self.get_user_interest_profile(user)
        candidate_communities = self.get_non_member_communities(user)

        recommendations = []
        for community in candidate_communities:
            community_profile = self.get_community_tag_profile(community)
            if user_interest.intersection(community_profile):
                # There is either a direct match or a semantic/ancestor match
                recommendations.append(community)

        return recommendations

    def get_not_followed_users(self, user):
        all_users = set(User.objects.exclude(id=user.id).values_list("id", flat=True))
        already_followed_users = set(UserFollowConnection.objects.filter(follower=user).values_list('followee_id', flat=True))

        not_followed_users = all_users - already_followed_users
        print("not_followeddd: ", not_followed_users)
        return list(not_followed_users)

    def recommend_users(self, user):
        user_interest = self.get_user_interest_profile(user)
        candidate_users = self.get_not_followed_users(user)
        candidate_users = User.objects.filter(id__in=candidate_users)

        current_user_combined_tags = self.calculate_weight_of_tags(user)

        user_recommendations = []
        for candidate_user in candidate_users:
            candidate_user_interest = self.get_user_interest_profile(candidate_user)
            if user_interest.intersection(candidate_user_interest):

                candidate_user_combined_tags = self.calculate_weight_of_tags(candidate_user)

                # Align tag vectors
                all_tags = set(current_user_combined_tags.keys()).union(candidate_user_combined_tags.keys())

                current_user_vec = np.array([current_user_combined_tags.get(tag, 0) for tag in all_tags])
                candidate_user_vec = np.array([candidate_user_combined_tags.get(tag, 0) for tag in all_tags])

                # Compute cosine similarity
                similarity = np.dot(current_user_vec, candidate_user_vec) / (np.linalg.norm(current_user_vec) * np.linalg.norm(candidate_user_vec))
                user_recommendations.append((candidate_user, similarity))

        print(user_recommendations)
        # Sort communities by similarity
        user_recommendations = sorted(user_recommendations, key=lambda x: x[1], reverse=True)

        return user_recommendations[:10]

    def calculate_weight_of_tags(self, user):
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

        return user_combined_tags

    def calculate_recommendations(self, user):
        # Fetch user's post tags

        user_combined_tags = self.calculate_weight_of_tags(user)
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

    def get_instance_of_qids(self, semantic_data):
        """
        Extract all 'instance of' (P31) Q-IDs from the tag's semantic_data.
        """
        instance_of_qids = set()
        if not semantic_data or 'P31' not in semantic_data:
            return instance_of_qids

        for statement in semantic_data['P31']:
            mainsnak = statement.get('mainsnak', {})
            datavalue = mainsnak.get('datavalue', {})
            value = datavalue.get('value', {})
            qid = value.get('id')
            if qid:
                instance_of_qids.add(qid)

        return instance_of_qids

    def get_user_instance_of_profile(self, user):
        user_tags = user.tags.all()
        user_instance_of_set = set()

        for tag in user_tags:
            if hasattr(tag, 'semantic_metadata'):
                sem_data = tag.semantic_metadata.semantic_data
                user_instance_of_set.update(self.get_instance_of_qids(sem_data))
        return user_instance_of_set

    def get_community_instance_of_profile(self, community):
        community_posts = Post.objects.filter(community=community)
        community_tags = set()

        for post in community_posts:
            community_tags.update(post.tags.all())

        community_instance_of_set = set()
        for tag in community_tags:
            if hasattr(tag, 'semantic_metadata'):
                sem_data = tag.semantic_metadata.semantic_data
                community_instance_of_set.update(self.get_instance_of_qids(sem_data))

        return community_instance_of_set

    def recommend_communities_based_on_instance_of(self, user):
        user_instance_of = self.get_user_instance_of_profile(user)
        candidate_communities = self.get_non_member_communities(user)

        recommendations = []
        for community in candidate_communities:
            community_instance_of = self.get_community_instance_of_profile(community)
            if user_instance_of.intersection(community_instance_of):
                # If there's any overlap in instance_of Q-IDs, recommend this community
                recommendations.append(community)

        return recommendations

    def handle(self, *args, **kwargs):
        self.update_tag_metadata()
        active_users = User.objects.filter(is_active=True)
        for active_user in active_users:
            # Community Recommendation
            comm_ids = set()
            p279_comm_ids = set()
            p31_comm_ids = set()

            p31_recs = self.recommend_communities_based_on_instance_of(active_user)
            for eachrec in p31_recs:
                p31_comm_ids.add(eachrec.id)

            p279_recs = self.recommend_communities(active_user)
            for eachrec in p279_recs:
                p279_comm_ids.add(eachrec.id)

            recommendations = self.calculate_recommendations(active_user)
            UserCommunityRecommendation.objects.filter(user=active_user).delete()
            for community, score in recommendations:
                if not np.isnan(score) and float(score) > 0:
                    comm_ids.add(community.id)
            all_comm_ids = (comm_ids.union(p279_comm_ids)).union(p31_comm_ids)
            for eachid in list(all_comm_ids):
                community = Community.objects.get(id=eachid)
                UserCommunityRecommendation.objects.create(user=active_user, community=community)

            # User Recommendation
            UserUserRecommendation.objects.filter(user=active_user).delete()
            p279_user_ids = set()
            user_recommendations = self.recommend_users(active_user)
            for candidate_user, score in user_recommendations:
                p279_user_ids.add(candidate_user.id)

            candidate_ids = set()
            for candidate_user, score in user_recommendations:
                if not np.isnan(score) and float(score) > 0:
                    candidate_ids.add(candidate_user.id)
            all_candidate_ids = candidate_ids.union(p279_user_ids)
            for candidate_id in all_candidate_ids:
                active_user = User.objects.get(id=active_user.id)
                candidate_user = User.objects.get(id=candidate_id)
                UserUserRecommendation.objects.create(user=active_user, recommended_user=candidate_user)

        self.stdout.write("Recommendations updated successfully.")
