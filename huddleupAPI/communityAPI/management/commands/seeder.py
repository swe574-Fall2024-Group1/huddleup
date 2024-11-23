from django.core.management.base import BaseCommand
from communityAPI.models import Badge

class Command(BaseCommand):
    help = 'Seed the database with default values'

    def handle(self, *args, **kwargs):
        # self.seed_badges()
        pass

    def seed_badges(self):
        default_badges = [
            {
                'name': 'Community Starter',
                'type': 'manual',
                'description': 'Awarded for starting a new community',
                'community': None
            },
            {
                'name': 'Top Contributor',
                'type': 'automatic',
                'description': 'Awarded for being a top contributor',
                'community': None
            },
            {
                'name': 'Helpful Member',
                'type': 'manual',
                'description': 'Awarded for being helpful in the community',
                'community': None
            }
        ]

        for badge_data in default_badges:
            # check if badge already exists
            badge, created = Badge.objects.get_or_create(
                name=badge_data['name'],
                type=badge_data['type'],
                description=badge_data['description'],
                community=badge_data['community']
            )

        self.stdout.write(self.style.SUCCESS('Successfully seeded the database with default badges'))

    def seed_users(self):
        # TODO seed users
        pass

    def seed_communities(self):
        # TODO seed communities
        pass
