from rest_framework import serializers
from .models import *

from django.contrib.auth.models import User

default_fields = ('id', 'title', 'date', 'picto', 'content')
products_fields = default_fields + ('abstract', 'bg_image', 'description', 'pictoBg', 'squarePicto')
business_prop_fields = default_fields + ('exec_sum', 'bg_image', 'pdf', 'storage')


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ('title', 'subsection', 'date', 'picto', 'content')

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subsection
        fields = ('title',)

class SubsectionSerializer(serializers.ModelSerializer):
    section = SectionSerializer(read_only=True)
    class Meta:
        model = Subsection
        fields = ('pk', 'title', 'section', 'introduction', 'content_text')

class BuildXRSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildXR
        fields = ('json',)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class BusinessPropositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessProposition
        fields = business_prop_fields

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = products_fields
