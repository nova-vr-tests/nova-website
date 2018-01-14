from .models import BusinessProposition, BlogPost
from .serializers import BusinessPropositionSerializer, BlogPostSerializer
from rest_framework import generics


class BusinessPropositionList(generics.ListCreateAPIView):
    queryset = BusinessProposition.objects.all()
    serializer_class = BusinessPropositionSerializer


class BusinessPropositionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BusinessProposition.objects.all()
    serializer_class = BusinessProposition

class BlogPostList(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer


class BlogPostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPost
