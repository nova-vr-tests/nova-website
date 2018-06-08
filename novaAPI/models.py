"""
Models
"""

from datetime import datetime
from django.db import models
from markdownx.models import MarkdownxField

from django.contrib.auth.models import User

# Create your models here.
class BusinessProposition(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('publication date', default=datetime.now)
    picto = models.ImageField(upload_to='business_props_pdfs')
    pdf = models.FileField(upload_to='business_props_pdfs')
    content = MarkdownxField()
    password = models.CharField(max_length=100, blank=True, default='')
    exec_sum = MarkdownxField()
    bg_image = models.ImageField(upload_to='business_props_bgs')
    storage = models.CharField(max_length=100, blank=True, default='')

    class Meta:
        verbose_name = 'Business Proposition'
        verbose_name_plural = 'Business Propositions'

# Create your models here.
class BlogPost(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    author = models.ForeignKey(User, models.SET_NULL, blank=True, null=True)
    picto = models.ImageField(upload_to='blog_pics')
    content = MarkdownxField()

    class Meta:
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Lab Live'

class Product(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    description = models.CharField(max_length=250, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='products_pics')
    pictoBg = models.ImageField(upload_to='products_pics')
    squarePicto = models.ImageField(upload_to='products_pics')
    content = MarkdownxField()
    abstract = MarkdownxField()
    bg_image = models.ImageField(upload_to='products_bgs')

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'


class Publication(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='publication_pics')
    pdf = models.FileField(upload_to='publication_pdfs')
    content = MarkdownxField()

    class Meta:
        verbose_name = 'Publication'
        verbose_name_plural = 'Publications'


class Industry(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='industry_pics')
    content = MarkdownxField()

    class Meta:
        verbose_name = 'Industry'
        verbose_name_plural = 'Industries'

class CrossIndustry(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='cross_industry_pics')
    content = MarkdownxField()

    class Meta:
        verbose_name = 'Cross Industry'
        verbose_name_plural = 'Cross Industry'

class LearningLab(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='learning_lab_pics')
    content = MarkdownxField()

    class Meta:
        verbose_name = 'Learning Lab'
        verbose_name_plural = 'Learning Lab'

class AboutUs(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='about_us_pics')
    content = MarkdownxField()

    class Meta:
        verbose_name = 'About Us'
        verbose_name_plural = 'About Us'

class Community(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='community_pics')
    content = MarkdownxField()

    class Meta:
        verbose_name = 'Community'
        verbose_name_plural = 'Communities'

class Design(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='design_pics')
    content = MarkdownxField()

    class Meta:
        verbose_name = 'Design'
        verbose_name_plural = 'Design'

class Program(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='program_pics')
    content = MarkdownxField()

    class Meta:
        verbose_name = 'Program'
        verbose_name_plural = 'Program'

class Produce(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='produce_pics')
    content = MarkdownxField()

    class Meta:
        verbose_name = 'Produce'
        verbose_name_plural = 'Produce'

class Network(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='network_pics')
    content = MarkdownxField()

    class Meta:
        verbose_name = 'Network'
        verbose_name_plural = 'Network'

class Deploy(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='deploy_pics')
    content = MarkdownxField()

    class Meta:
        verbose_name = 'Deploy'
        verbose_name_plural = 'Deploy'

class Production(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='productions_pics')
    content = MarkdownxField()

    class Meta:
        verbose_name = 'Production'
        verbose_name_plural = 'Productions'

class Partner(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='partners_pics')
    content = MarkdownxField()

    class Meta:
        verbose_name = 'Partner'
        verbose_name_plural = 'Partners'

class Career(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='careers_pics')
    content = MarkdownxField()

    class Meta:
        verbose_name = 'Career'
        verbose_name_plural = 'Careers'
