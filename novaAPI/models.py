from django.db import models

# Create your models here.
class BusinessProposition(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
