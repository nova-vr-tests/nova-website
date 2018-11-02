from rest_framework import serializers
from .models import *

from django.contrib.auth.models import User

default_fields = ('id', 'title', 'date', 'picto', 'content')
products_fields = default_fields + ('abstract', 'bg_image', 'description', 'pictoBg', 'squarePicto')
business_prop_fields = default_fields + ('exec_sum', 'bg_image', 'pdf', 'storage')


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ('pk', 'title', 'subsection', 'date', 'picto', 'content')


class MiniPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ('id', 'title', 'date', 'picto')

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subsection
        fields = ('title',)

class SubsectionSerializer(serializers.ModelSerializer):
    section = SectionSerializer(read_only=True)
    page_set = MiniPageSerializer(many=True, read_only=True)
    content = serializers.CharField(source='content_text')

    class Meta:
        model = Subsection
        fields = (
            'id',
            'title',
            'section',
            'introduction',
            'content',
            'page_set',
            'background_image',
            )

class MiniSubsectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subsection
        fields = ('id', 'url', 'title', 'background_image', 'introduction')

class SectionSerializer(serializers.ModelSerializer):
    subsection_set = MiniSubsectionSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = ('id', 'title', 'subsection_set')

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
