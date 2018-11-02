"""
Models
"""

from datetime import datetime
from django.db import models
from markdownx.models import MarkdownxField

from django.contrib.auth.models import User



class Section(models.Model):
    title = models.CharField(unique=True, max_length=100, default='')

    def __str__(self):
        return self.title

class Subsection(models.Model):
    title = models.CharField(max_length=100, default='')
    url = models.CharField(unique=True, max_length=100)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    introduction = MarkdownxField()
    content_text = MarkdownxField(blank=True)
    background_image= models.ImageField(upload_to='imgs')

    def __str__(self):
        return self.title

class Page(models.Model):
    title = models.CharField(max_length=100, default='')
    subsection = models.ForeignKey(Subsection, on_delete=models.CASCADE)
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='imgs')
    content = MarkdownxField()

    def __str__(self):
        return self.title


class BuildXR(models.Model):
    json = models.TextField()
    date = models.DateTimeField('Submission date', default=datetime.now)

    class Meta:
        verbose_name = 'BuildXR answer'
        verbose_name_plural = 'BuildXR answers'

class BusinessProposition(models.Model):
    title = models.CharField(max_length=100, default='')
    date = models.DateTimeField('publication date', default=datetime.now)
    picto = models.ImageField(upload_to='business_props_pdfs')
    content = MarkdownxField()
    password = models.CharField(max_length=100, default='')
    exec_sum = MarkdownxField()
    bg_image = models.ImageField(upload_to='business_props_bgs')
    pdf = models.FileField(blank=True, upload_to='business_props_pdfs')
    storage = models.CharField(max_length=100, blank=True, default='')

    class Meta:
        verbose_name = 'Business Proposition'
        verbose_name_plural = 'Business Propositions'


class Product(models.Model):
    title = models.CharField(max_length=100,default='')
    description = models.CharField(max_length=250, default='')
    date = models.DateTimeField('date published', default=datetime.now)
    picto = models.ImageField(upload_to='products_pics')
    pictoBg = models.ImageField(upload_to='products_pics')
    squarePicto = models.ImageField(upload_to='products_pics')
    content = MarkdownxField()
    abstract = MarkdownxField()
    bg_image = models.ImageField(upload_to='products_bgs')
    pdf = models.FileField(blank=True, upload_to='business_props_pdfs')

    class Meta:
        verbose_name = 'Product'
        verbose_name_plural = 'Products'

