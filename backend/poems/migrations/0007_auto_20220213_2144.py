# Generated by Django 3.2.9 on 2022-02-13 21:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poems', '0006_poem_is_published'),
    ]

    operations = [
        migrations.AddField(
            model_name='poem',
            name='date_updated',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='poem',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
