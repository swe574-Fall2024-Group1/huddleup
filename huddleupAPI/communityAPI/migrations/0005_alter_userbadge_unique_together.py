# Generated by Django 3.2.4 on 2024-11-13 15:08

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('communityAPI', '0004_remove_badge_image'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='userbadge',
            unique_together={('user', 'badge')},
        ),
    ]
