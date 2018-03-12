from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^businessprops/$', views.BusinessPropositionList.as_view()),
    url(r'^businessprops/(?P<pk>[0-9]+)/$', views.BusinessPropositionDetail.as_view()),

    url(r'^blogposts/$', views.BlogPostList.as_view()),
    url(r'^blogposts/(?P<pk>[0-9]+)/$', views.BlogPostDetail.as_view()),

    url(r'^products/$', views.ProductsList.as_view()),
    url(r'^products/(?P<pk>[0-9]+)/$', views.ProductDetail.as_view()),

    url(r'^publications/$', views.PublicationsList.as_view()),
    url(r'^publications/(?P<pk>[0-9]+)/$', views.PublicationDetail.as_view()),

    url(r'^industries/$', views.IndustryList.as_view()),
    url(r'^industries/(?P<pk>[0-9]+)/$', views.IndustryDetail.as_view()),

    url(r'^cross-industry/$', views.CrossIndustryList.as_view()),
    url(r'^cross-industry/(?P<pk>[0-9]+)/$', views.CrossIndustryDetail.as_view()),

    url(r'^learning-lab/$', views.LearningLabList.as_view()),
    url(r'^learning-lab/(?P<pk>[0-9]+)/$', views.LearningLabDetail.as_view()),

    url(r'^about-us2/$', views.AboutUsList.as_view()),
    url(r'^about-us2/(?P<pk>[0-9]+)/$', views.AboutUsDetail.as_view()),

    url(r'^community/$', views.CommunityList.as_view()),
    url(r'^community/(?P<pk>[0-9]+)/$', views.CommunityDetail.as_view()),

    url(r'^design/$', views.DesignList.as_view()),
    url(r'^design/(?P<pk>[0-9]+)/$', views.DesignDetail.as_view()),

    url(r'^program/$', views.ProgramList.as_view()),
    url(r'^program/(?P<pk>[0-9]+)/$', views.ProductDetail.as_view()),

    url(r'^produce/$', views.ProductsList.as_view()),
    url(r'^produce/(?P<pk>[0-9]+)/$', views.ProduceDetail.as_view()),

    url(r'^network/$', views.NetworkList.as_view()),
    url(r'^network/(?P<pk>[0-9]+)/$', views.NewtorkDetail.as_view()),

    url(r'^deploy/$', views.DeployList.as_view()),
    url(r'^deploy/(?P<pk>[0-9]+)/$', views.DeployDetail.as_view()),

    url(r'^productions/$', views.ProductionList.as_view()),
    url(r'^productions/(?P<pk>[0-9]+)/$', views.ProductionDetail.as_view()),

    url(r'^partners/$', views.PartnerList.as_view()),
    url(r'^partners/(?P<pk>[0-9]+)/$', views.PartnerDetail.as_view()),

    url(r'^careers/$', views.CareerList.as_view()),
    url(r'^careers/(?P<pk>[0-9]+)/$', views.CareerDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
