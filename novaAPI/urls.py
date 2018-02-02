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
    url(r'^consultancies/$', views.ConsultanciesList.as_view()),
    url(r'^consultancies/(?P<pk>[0-9]+)/$', views.ConsultancyDetail.as_view()),
    url(r'^solutions\_productions/$', views.SolutionsProductionsList.as_view()),
    url(r'^solutions\_productions/(?P<pk>[0-9]+)/$', views.SolutionsProductionDetail.as_view()),
    url(r'^publishings/$', views.PublishingsList.as_view()),
    url(r'^publishings/(?P<pk>[0-9]+)/$', views.PublishingDetail.as_view()),
    url(r'^partnership\_productions/$', views.PartnershipProductionsList.as_view()),
    url(r'^partnership\_productions/(?P<pk>[0-9]+)/$', views.PartnershipProductionDetail.as_view()),
    url(r'^publications/$', views.PublicationsList.as_view()),
    url(r'^publications/(?P<pk>[0-9]+)/$', views.PublicationDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
