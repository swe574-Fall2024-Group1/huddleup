# Generated by Django 3.2.4 on 2024-04-10 18:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communityAPI', '0002_alter_community_mainimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='community',
            name='mainImage',
            field=models.CharField(max_length=5000000),
        ),
    ]