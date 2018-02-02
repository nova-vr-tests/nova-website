from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin
from .models import *

class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'date')
    list_filter = ['date', 'author']
    search_fields = ['title', 'content']

class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class ConsultancyAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class SolutionsProductionAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class PublishingAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class PartnershipProductionAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class PublicationAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

class BusinessPropositionAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

# Register your models here.
admin.site.register(BusinessProposition, BusinessPropositionAdmin)
admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Consultancy, ConsultancyAdmin)
admin.site.register(SolutionsProduction, SolutionsProductionAdmin)
admin.site.register(Publishing, PublishingAdmin)
admin.site.register(PartnershipProduction, PartnershipProductionAdmin)
admin.site.register(Publication, PublicationAdmin)

