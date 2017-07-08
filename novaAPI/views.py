from .models import BusinessProposition
from .serializers import BusinessPropositionSerializer
from rest_framework import generics


class BusinessPropositionList(generics.ListCreateAPIView):
    queryset = BusinessProposition.objects.all()
    serializer_class = BusinessPropositionSerializer


class BusinessPropositionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BusinessProposition.objects.all()
    serializer_class = BusinessProposition