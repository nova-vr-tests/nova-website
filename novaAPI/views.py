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

### Publications

class PublicationsList(generics.ListCreateAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer

class PublicationDetail(generics.RetrieveAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer

### Industry

class IndustryList(generics.ListCreateAPIView):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer

class IndustryDetail(generics.RetrieveAPIView):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer

### Cross Industry

class CrossIndustryList(generics.ListCreateAPIView):
    queryset = CrossIndustry.objects.all()
    serializer_class = CrossIndustrySerializer

class CrossIndustryDetail(generics.RetrieveAPIView):
    queryset = CrossIndustry.objects.all()
    serializer_class = CrossIndustrySerializer

### Learning Lab

class LearningLabList(generics.ListCreateAPIView):
    queryset = LearningLab.objects.all()
    serializer_class = LearningLabSerializer

class LearningLabDetail(generics.RetrieveAPIView):
    queryset = LearningLab.objects.all()
    serializer_class = LearningLabSerializer

### About Us

class AboutUsList(generics.ListCreateAPIView):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer

class AboutUsDetail(generics.RetrieveAPIView):
    queryset = AboutUs.objects.all()
    serializer_class = AboutUsSerializer


### Community

class CommunityList(generics.ListCreateAPIView):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer

class CommunityDetail(generics.RetrieveAPIView):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer

### Design

class DesignList(generics.ListCreateAPIView):
    queryset = Design.objects.all()
    serializer_class = DesignSerializer

class DesignDetail(generics.RetrieveAPIView):
    queryset = Design.objects.all()
    serializer_class = Design

### Program

class ProgramList(generics.ListCreateAPIView):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer

class ProgramDetail(generics.RetrieveAPIView):
    queryset = Program.objects.all()
    serializer_class = Produce

### Produce

class ProduceList(generics.ListCreateAPIView):
    queryset = Produce.objects.all()
    serializer_class = ProduceSerializer

class ProduceDetail(generics.RetrieveAPIView):
    queryset = Produce.objects.all()
    serializer_class = ProduceSerializer

### Network

class NetworkList(generics.ListCreateAPIView):
    queryset = Network.objects.all()
    serializer_class = NetworkSerializer

class NewtorkDetail(generics.RetrieveAPIView):
    queryset = Network.objects.all()
    serializer_class = NetworkSerializer

### Deploy

class DeployList(generics.ListCreateAPIView):
    queryset = Deploy.objects.all()
    serializer_class = DeploySerializer

class DeployDetail(generics.RetrieveAPIView):
    queryset = Deploy.objects.all()
    serializer_class = DeploySerializer


### Production

class ProductionList(generics.ListCreateAPIView):
    queryset = Production.objects.all()
    serializer_class = ProductionSerializer

class ProductionDetail(generics.RetrieveAPIView):
    queryset = Production.objects.all()
    serializer_class = ProductionSerializer

### Partners

class PartnerList(generics.ListCreateAPIView):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

class PartnerDetail(generics.RetrieveAPIView):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

### Career

class CareerList(generics.ListCreateAPIView):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer

class CareerDetail(generics.RetrieveAPIView):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer
