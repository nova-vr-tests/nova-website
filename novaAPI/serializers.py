from rest_framework import serializers
from .models import BusinessProposition

class BusinessPropositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessProposition
        fields = ('id', 'title')