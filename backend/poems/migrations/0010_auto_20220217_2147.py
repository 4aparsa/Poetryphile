# Generated by Django 3.2.9 on 2022-02-17 21:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('poems', '0009_rename_tweet_ink_poem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='poem',
            name='inks',
            field=models.ManyToManyField(blank=True, related_name='inks', through='poems.Ink', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='poem',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='poems', to=settings.AUTH_USER_MODEL),
        ),
    ]
