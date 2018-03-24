# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2018-03-11 23:21
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
import markdownx.models


class Migration(migrations.Migration):

    dependencies = [
        ('novaAPI', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Community',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, default='', max_length=100)),
                ('date', models.DateTimeField(default=datetime.datetime.now, verbose_name='date published')),
                ('picto', models.ImageField(upload_to='partnership_productions_pics')),
                ('content', markdownx.models.MarkdownxField()),
            ],
            options={
                'verbose_name': 'Community',
                'verbose_name_plural': 'Communities',
            },
        ),
        migrations.CreateModel(
            name='Design',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, default='', max_length=100)),
                ('date', models.DateTimeField(default=datetime.datetime.now, verbose_name='date published')),
                ('picto', models.ImageField(upload_to='partnership_productions_pics')),
                ('content', markdownx.models.MarkdownxField()),
            ],
            options={
                'verbose_name': 'Design',
                'verbose_name_plural': 'Design',
            },
        ),
        migrations.CreateModel(
            name='Develop',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, default='', max_length=100)),
                ('date', models.DateTimeField(default=datetime.datetime.now, verbose_name='date published')),
                ('picto', models.ImageField(upload_to='partnership_productions_pics')),
                ('content', markdownx.models.MarkdownxField()),
            ],
            options={
                'verbose_name': 'Develop',
                'verbose_name_plural': 'Develop',
            },
        ),
        migrations.CreateModel(
            name='Produce',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, default='', max_length=100)),
                ('date', models.DateTimeField(default=datetime.datetime.now, verbose_name='date published')),
                ('picto', models.ImageField(upload_to='partnership_productions_pics')),
                ('content', markdownx.models.MarkdownxField()),
            ],
            options={
                'verbose_name': 'Produce',
                'verbose_name_plural': 'Produce',
            },
        ),
        migrations.CreateModel(
            name='Program',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, default='', max_length=100)),
                ('date', models.DateTimeField(default=datetime.datetime.now, verbose_name='date published')),
                ('picto', models.ImageField(upload_to='partnership_productions_pics')),
                ('content', markdownx.models.MarkdownxField()),
            ],
            options={
                'verbose_name': 'Program',
                'verbose_name_plural': 'Program',
            },
        ),
        migrations.AlterModelOptions(
            name='consultancy',
            options={'verbose_name': 'Industry', 'verbose_name_plural': 'Industries'},
        ),
        migrations.AlterModelOptions(
            name='partnershipproduction',
            options={'verbose_name': 'About Us', 'verbose_name_plural': 'About Us'},
        ),
        migrations.AlterModelOptions(
            name='publishing',
            options={'verbose_name': 'Learning Lab', 'verbose_name_plural': 'Learning Lab'},
        ),
        migrations.AlterModelOptions(
            name='solutionsproduction',
            options={'verbose_name': 'Cross Industry', 'verbose_name_plural': 'Cross Industry'},
        ),
    ]