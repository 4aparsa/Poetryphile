# Generated by Django 3.2.9 on 2022-01-22 22:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='useraccount',
            options={},
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='is_staff',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='is_superuser',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='user_permissions',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='username',
        ),
    ]
