from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin
from .models import *

class BusinessPropositionAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'id')
    list_filter = ['date']
    search_fields = ['title', 'content']

class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'date')
    list_filter = ['date', 'author']
    search_fields = ['title', 'content']

class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class PublicationAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']



class IndustryAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class CrossIndustryAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class LeaningLabAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class AboutUsAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class CommunityAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class DesignAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class ProgramAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class ProduceAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class NetworkAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class DeployAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']


class ProductionAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class PartnerAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class CareerAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

# Register your models here.
admin.site.register(BusinessProposition, BusinessPropositionAdmin)
admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Industry, IndustryAdmin)
admin.site.register(CrossIndustry, CrossIndustryAdmin)
admin.site.register(LearningLab, LeaningLabAdmin)
admin.site.register(AboutUs, AboutUsAdmin)
admin.site.register(Publication, PublicationAdmin)

admin.site.register(Community, CommunityAdmin)
admin.site.register(Design, DesignAdmin)
admin.site.register(Program, ProgramAdmin)
admin.site.register(Produce, ProduceAdmin)
admin.site.register(Network, NetworkAdmin)
admin.site.register(Deploy, DeployAdmin)

admin.site.register(Production, ProduceAdmin)
admin.site.register(Partner, PartnerAdmin)
admin.site.register(Career, CareerAdmin)

