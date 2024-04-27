# Generated by Django 3.2.4 on 2024-04-23 19:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authAPI', '0002_session'),
        ('communityAPI', '0010_commentlike_postlike'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommunityInvitation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('community', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='communityAPI.community')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authAPI.user')),
            ],
        ),
    ]