# Generated by Django 4.2.1 on 2024-06-08 14:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Base', '0002_alter_todo_pinned_date'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='todo',
            options={'verbose_name': 'Todo', 'verbose_name_plural': 'Todos'},
        ),
    ]
