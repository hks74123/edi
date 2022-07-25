# Generated by Django 4.0.6 on 2022-07-25 04:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0002_remove_user1_is_staff_remove_user1_is_superuser_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user1',
            name='staff',
        ),
        migrations.RemoveField(
            model_name='user1',
            name='superuser',
        ),
        migrations.AddField(
            model_name='user1',
            name='is_staff',
            field=models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status'),
        ),
        migrations.AddField(
            model_name='user1',
            name='is_superuser',
            field=models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status'),
        ),
    ]
