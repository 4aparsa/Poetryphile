# Generated by Django 3.2.9 on 2022-02-17 21:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('poems', '0007_auto_20220213_2144'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('inker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('tweet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='poems.poem')),
            ],
        ),
        migrations.AddField(
            model_name='poem',
            name='inks',
            field=models.ManyToManyField(blank=True, related_name='inker', through='poems.Ink', to=settings.AUTH_USER_MODEL),
        ),
    ]
