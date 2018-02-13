from rest_framework import serializers
from .models import *

from django.contrib.auth.models import User

default_fields = ('id', 'title', 'date', 'picto', 'content')
blog_post_fields = ('id', 'title', 'author', 'date', 'picto', 'content')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class BusinessPropositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessProposition
        fields = default_fields

class BlogPostSerializer(serializers.ModelSerializer):
    child = User.objects.all()
    author = UserSerializer(child)

    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'author', 'date', 'picto', 'content')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'title', 'abstract', 'date', 'picto', 'content', 'bg_image', 'description')

class ConsultancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultancy
        fields = default_fields

class SolutionsProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolutionsProduction
        fields = default_fields

class PublishingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publishing
        fields = default_fields

class PartnershipProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnershipProduction
        fields = default_fields

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = ('id', 'title', 'date', 'picto', 'pdf', 'content')
