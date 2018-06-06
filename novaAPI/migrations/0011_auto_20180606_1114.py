# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2018-06-06 15:14
from __future__ import unicode_literals

from django.db import migrations, models
import markdownx.models


class Migration(migrations.Migration):

    dependencies = [
        ('novaAPI', '0010_auto_20180606_1113'),
    ]

    operations = [
        migrations.AddField(
            model_name='businessproposition',
            name='abstract',
            field=markdownx.models.MarkdownxField(default=''),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='businessproposition',
            name='bg_image',
            field=models.ImageField(default='', upload_to='business_props_bgs'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='businessproposition',
            name='pdf',
            field=models.FileField(upload_to='business_props_pdfs'),
        ),
        migrations.AlterField(
            model_name='businessproposition',
            name='picto',
            field=models.ImageField(upload_to='business_props_pdfs'),
        ),
    ]
