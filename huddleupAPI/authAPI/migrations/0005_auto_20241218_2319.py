# Generated by Django 3.2.4 on 2024-12-18 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authAPI', '0004_auto_20241218_2311'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='birthday',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_picture',
            field=models.CharField(blank=True, default='', max_length=5000000),
        ),
    ]
