from django.db import models
from datetime import datetime
from markdownx.models import MarkdownxField

from django.contrib.auth.models import User

# Create your models here.
class BusinessProposition(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('publication date', default=datetime.now)
    picto = models.ImageField(upload_to='publication_pics')
    pdf = models.FileField(upload_to='publication_pdfs')
    content = MarkdownxField()

# Create your models here.
class BlogPost(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    author = models.ForeignKey(User)
    picto = models.ImageField(upload_to='blog_pics')
    content = MarkdownxField()

class Product(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    description = models.CharField(max_length=250, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='products_pics')
    content = MarkdownxField()
    abstract = MarkdownxField()
    bg_image = models.ImageField(upload_to='products_bgs')

class Consultancy(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='consultancy_pics')
    content = MarkdownxField()

class SolutionsProduction(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='solutions_production_pics')
    content = MarkdownxField()

class Publishing(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='publishing_pics')
    content = MarkdownxField()

class PartnershipProduction(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='partnership_productions_pics')
    content = MarkdownxField()

class Publication(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='publication_pics')
    pdf = models.FileField(upload_to='publication_pdfs')
    content = MarkdownxField()
