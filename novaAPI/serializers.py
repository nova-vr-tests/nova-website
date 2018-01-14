from rest_framework import serializers
from .models import BusinessProposition, BlogPost

class BusinessPropositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessProposition
        fields = ('id', 'title')

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'content')
