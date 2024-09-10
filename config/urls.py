from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from apps.products.views import product_page


urlpatterns = [
    path("", product_page, name="product-page"),
    path("admin/", admin.site.urls),
    path("api/v1/", include("apps.products.urls")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
