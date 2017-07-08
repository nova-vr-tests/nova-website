from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    url(r'^businessprops/$', views.BusinessPropositionList.as_view()),
    url(r'^businessprops/(?P<pk>[0-9]+)/$', views.BusinessPropositionDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)