from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin
from .models import *
from django.utils.html import format_html

class BusinessPropositionAdmin(admin.ModelAdmin):
    list_display = ('title', 'url', 'picto_img', 'bg_img', 'password', 'date', 'pdf_link', 'storage_link')
    list_filter = ['date']
    search_fields = ['title', 'content']

    def url(self, obj):
        return format_html("<a target='_blank' href='/business-props?post={0}'>Link</a>", obj.id)

    def picto_img(self, obj):
        return format_html("<a href='{0}' target='_blank'><img src='{0}' alt='picto' style='height: 5rem; width: 5rem;' /></a>", obj.picto.url.split('?')[0])

    def bg_img(self, obj):
        return format_html("<a href='{0}' target='_blank'><img src='{0}' alt='picto' style='height: 5rem; width: 10rem;' /></a>", obj.bg_image.url.split('?')[0])

    def pdf_link(self, obj):
        return format_html("<a target='_blank' href='{0}'>PDF link</a>", obj.pdf.url.split('?')[0])

    def storage_link(self, obj):
        if obj.storage == '':
            return format_html("No Dropbox link")

        return format_html("<a target='_blank' href='{0}'>Dropbox link</a>", obj.storage.split('?')[0])

class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'date')
    list_filter = ['date', 'author']
    search_fields = ['title', 'content']

class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'url', 'picto_img', 'bg_img', 'square_picto_img', 'date')
    list_filter = ['date']
    search_fields = ['title', 'content']

    def url(self, obj):
        return format_html("<a target='_blank' href='/products?post={0}'>Link</a>", obj.id)


    def picto_img(self, obj):
        pictoBgUrl = ''
        pictoUrl = ''
        if obj.pictoBg:
            pictoBgUrl = obj.pictoBg.url.split('?')[0]

        if obj.picto:
            pictoUrl = obj.picto.url.split('?')[0]

        return format_html("""<div style='position: relative; height: 5rem; width: 7.5rem;'>
            <a href='{0}' target='_blank'>
                <img src='{1}' alt='picto bg' style='height: 5rem; width: 7.5rem; position: absolute' />
                <img src='{0}' alt='picto' style='height: 5rem; width: 7.5rem; position: absolute; transform: translate(-20px, 20px);' />
            </a>
        </div>""", pictoUrl, pictoBgUrl)


    def square_picto_img(self, obj):
        pictoBgUrl = ''
        if obj.squarePicto:
            pictoBgUrl = obj.squarePicto.url.split('?')[0]
        else:
            return format_html("No square picto")

        return format_html("<a href='{0}' target='_blank'><img src='{0}' alt='picto' style='height: 5rem; width: 5rem;' /></a>", pictoBgUrl)


    def bg_img(self, obj):
        return format_html("<a href='{0}' target='_blank'><img src='{0}' alt='picto' style='height: 5rem; width: 10rem;' /></a>", obj.bg_image.url.split('?')[0])



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

