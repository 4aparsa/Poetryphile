# Generated by Django 3.2.9 on 2022-01-25 00:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('poems', '0002_auto_20220124_2150'),
    ]

    operations = [
        migrations.AlterField(
            model_name='poem',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='poem_set', to=settings.AUTH_USER_MODEL),
        ),
    ]
