from django.contrib import admin

from apps.products.models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ["name", "description", "price"]
    list_filter = ["name"]
    search_fields = ["name", "description"]
    list_editable = ["price"]
