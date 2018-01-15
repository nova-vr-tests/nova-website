from .models import BusinessProposition, BlogPost
from .serializers import BusinessPropositionSerializer, BlogPostSerializer
from rest_framework import generics


class BusinessPropositionList(generics.ListCreateAPIView):
    queryset = BusinessProposition.objects.all()
    serializer_class = BusinessPropositionSerializer


class BusinessPropositionDetail(generics.RetrieveAPIView):
    queryset = BusinessProposition.objects.all()
    serializer_class = BusinessPropositionSerializer

class BlogPostList(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer


class BlogPostDetail(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
