from django.contrib import admin
from markdownx.admin import MarkdownxModelAdmin
from .models import BusinessProposition, BlogPost

# Register your models here.
admin.site.register(BusinessProposition, MarkdownxModelAdmin)
admin.site.register(BlogPost)
