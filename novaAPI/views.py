from .models import BusinessProposition, BuildXR, Page, Section
from .serializers import *
from rest_framework import generics
from django.http import HttpResponse

from rest_framework.permissions import IsAuthenticatedOrReadOnly


class PageList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Page.objects.all()
    serializer_class = PageSerializer

class PageDetail(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Page.objects.all()
    serializer_class = PageSerializer

class SubsectionList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Subsection.objects.all()
    serializer_class = SubsectionSerializer

class SubsectionDetail(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Subsection.objects.all()
    serializer_class = SubsectionSerializer

### BuildXR
class BuildXRList(generics.ListCreateAPIView):
    queryset = BuildXR.objects.all()
    serializer_class = BuildXRSerializer

class BuildXRDetail(generics.RetrieveAPIView):
    queryset = BuildXR.objects.all()
    serializer_class = BuildXRSerializer

class BusinessPropositionList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = BusinessProposition.objects.all()
    serializer_class = BusinessPropositionSerializer

class BusinessPropositionDetail(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = BusinessProposition.objects.all()
    serializer_class = BusinessPropositionSerializer

    # disallow get requests
    def get(self, req, *args, **kwargs):
            return HttpResponse('error')

    def post(self, req, *args, **kwargs):
        obj = self.get_object()

        # this breaks on empty passwords
        user_password = str([*req.POST][0]) # post data is sent in key of req for some reason
        if obj.password != user_password:
            return HttpResponse('error')

        return self.retrieve(req, *args, **kwargs)

### Products

class ProductsList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductDetail(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

