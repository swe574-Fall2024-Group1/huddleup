from django.core.management.base import BaseCommand
from django.core.management import call_command

class Command(BaseCommand):
    help = "Run makemigrations, migrate, and seeders in one command"

    def handle(self, *args, **kwargs):
        call_command("makemigrations")
        call_command("migrate")
        call_command("seeder")
