# Generated by Django 3.2.9 on 2022-01-25 12:58

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('poems', '0004_alter_poem_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='poem',
            name='date_created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
