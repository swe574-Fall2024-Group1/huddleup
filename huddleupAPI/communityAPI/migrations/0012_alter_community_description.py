# Generated by Django 3.2.4 on 2024-04-28 21:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('communityAPI', '0011_communityinvitation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='community',
            name='description',
            field=models.CharField(max_length=500),
        ),
    ]