# Generated by Django 3.2.9 on 2022-01-24 21:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poems', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='poem',
            name='title',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='poem',
            name='text',
            field=models.TextField(blank=True),
        ),
    ]
