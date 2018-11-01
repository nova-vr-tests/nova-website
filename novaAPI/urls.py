from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path(r'businessprops/<int:pk>/', views.BusinessPropositionDetail.as_view()),

    path(r'products/', views.ProductsList.as_view()),
    path(r'products/<int:pk>/', views.ProductDetail.as_view()),



    path(r'sections/', views.SectionList.as_view()), # gives menu structure
    path(r'subsections/<int:pk>/', views.SubsectionDetail.as_view()), # allows to fetch rectangle info
    path(r'pages/<int:pk>/', views.PageDetail.as_view()), # allows to fetch page in particular

    path(r'buildXR/', views.BuildXRList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
