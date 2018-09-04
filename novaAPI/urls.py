from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path(r'businessprops/<int:pk>/', views.BusinessPropositionDetail.as_view()),

    path(r'blogposts/', views.BlogPostList.as_view()),
    path(r'blogposts/<int:pk>/', views.BlogPostDetail.as_view()),

    path(r'products/', views.ProductsList.as_view()),
    path(r'products/<int:pk>/', views.ProductDetail.as_view()),

    path(r'publications/', views.PublicationsList.as_view()),
    path(r'publications/<int:pk>/', views.PublicationDetail.as_view()),

    path(r'industries/', views.IndustryList.as_view()),
    path(r'industries/<int:pk>/', views.IndustryDetail.as_view()),

    path(r'cross-industry/', views.CrossIndustryList.as_view()),
    path(r'cross-industry/<int:pk>/', views.CrossIndustryDetail.as_view()),

    path(r'learning-lab/', views.LearningLabList.as_view()),
    path(r'learning-lab/<int:pk>/', views.LearningLabDetail.as_view()),

    path(r'about-us2/', views.AboutUsList.as_view()),
    path(r'about-us2/<int:pk>/', views.AboutUsDetail.as_view()),

    path(r'community/', views.CommunityList.as_view()),
    path(r'community/<int:pk>/', views.CommunityDetail.as_view()),

    path(r'design/', views.DesignList.as_view()),
    path(r'design/<int:pk>/', views.DesignDetail.as_view()),

    path(r'program/', views.ProgramList.as_view()),
    path(r'program/<int:pk>/', views.ProgramDetail.as_view()),

    path(r'produce/', views.ProduceList.as_view()),
    path(r'produce/<int:pk>/', views.ProduceDetail.as_view()),

    path(r'network/', views.NetworkList.as_view()),
    path(r'network/<int:pk>/', views.NewtorkDetail.as_view()),

    path(r'deploy/', views.DeployList.as_view()),
    path(r'deploy/<int:pk>/', views.DeployDetail.as_view()),

    path(r'productions/', views.ProductionList.as_view()),
    path(r'productions/<int:pk>/', views.ProductionDetail.as_view()),

    path(r'partners/', views.PartnerList.as_view()),
    path(r'partners/<int:pk>/', views.PartnerDetail.as_view()),

    path(r'careers/', views.CareerList.as_view()),
    path(r'careers/<int:pk>/', views.CareerDetail.as_view()),

    path(r'buildXR/', views.BuildXRList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
