from .models import BusinessProposition, BlogPost
from .serializers import *
from rest_framework import generics


### Business props

class BusinessPropositionList(generics.ListCreateAPIView):
    queryset = BusinessProposition.objects.all()
    serializer_class = BusinessPropositionSerializer

class BusinessPropositionDetail(generics.RetrieveAPIView):
    queryset = BusinessProposition.objects.all()
    serializer_class = BusinessPropositionSerializer

### Blog posts

class BlogPostList(generics.ListCreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

class BlogPostDetail(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer


### Products

class ProductsList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

### Consultancy

class ConsultanciesList(generics.ListCreateAPIView):
    queryset = Consultancy.objects.all()
    serializer_class = ConsultancySerializer

class ConsultancyDetail(generics.RetrieveAPIView):
    queryset = Consultancy.objects.all()
    serializer_class = ConsultancySerializer

### Solution production

class SolutionsProductionsList(generics.ListCreateAPIView):
    queryset = SolutionsProduction.objects.all()
    serializer_class = SolutionsProductionSerializer

class SolutionsProductionDetail(generics.RetrieveAPIView):
    queryset = SolutionsProduction.objects.all()
    serializer_class = SolutionsProductionSerializer

### Publishing

class PublishingsList(generics.ListCreateAPIView):
    queryset = Publishing.objects.all()
    serializer_class = SolutionsProductionSerializer

class PublishingDetail(generics.RetrieveAPIView):
    queryset = Publishing.objects.all()
    serializer_class = SolutionsProductionSerializer

### Partnership production

class PartnershipProductionsList(generics.ListCreateAPIView):
    queryset = PartnershipProduction.objects.all()
    serializer_class = SolutionsProductionSerializer

class PartnershipProductionDetail(generics.RetrieveAPIView):
    queryset = PartnershipProduction.objects.all()
    serializer_class = SolutionsProductionSerializer

### Publications

class PublicationsList(generics.ListCreateAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer

class PublicationDetail(generics.RetrieveAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
