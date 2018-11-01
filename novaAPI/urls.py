from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path(r'businessprops/<int:pk>/', views.BusinessPropositionDetail.as_view()),

    path(r'products/', views.ProductsList.as_view()),
    path(r'products/<int:pk>/', views.ProductDetail.as_view()),

    path(r'pages/', views.PageList.as_view()),
    path(r'pages/<int:pk>/', views.PageDetail.as_view()),

    path(r'sections/', views.SubsectionList.as_view()),
    path(r'sections/<int:pk>/', views.SubsectionDetail.as_view()),

    path(r'buildXR/', views.BuildXRList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
