# Generated by Django 3.2.4 on 2024-11-10 21:31

from django.db import migrations
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('taggit', '0005_auto_20220424_2025'),
        ('authAPI', '0002_auto_20241023_2041'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='tags',
            field=taggit.managers.TaggableManager(blank=True, help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
    ]