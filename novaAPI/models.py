from django.db import models
from markdownx.models import MarkdownxField

# Create your models here.
class BusinessProposition(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')

# Create your models here.
class BlogPost(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    specifications = models.FileField(upload_to='blog_pics')
    content = MarkdownxField()

class BlogPost(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    content = MarkdownxField()
