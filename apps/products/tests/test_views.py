from django.urls import reverse
from rest_framework import status

import json

from rest_framework.test import APITestCase

from apps.products.models import Product


class ProductAPITestCase(APITestCase):

    def setUp(self):
        self.product_data = {
            "name": "Test Product",
            "description": "Test description",
            "price": "9.99",
        }
        self.invalid_product_data = {
            "name": "",
            "description": "No name",
            "price": "-10.00",
        }

    def test_create_product_valid(self):
        """
        Проверка успешного создания продукта с валидными данными
        """
        response = self.client.post(
            reverse("product-list-create"),
            data=json.dumps(self.product_data),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Product.objects.count(), 1)
        self.assertEqual(Product.objects.first().name, "Test Product")

    def test_create_product_invalid(self):
        """
        Проверка ошибки создания продукта с невалидными данными
        """
        response = self.client.post(
            reverse("product-list-create"),
            data=json.dumps(self.invalid_product_data),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Product.objects.count(), 0)

    def test_get_products(self):
        """
        Проверка получения списка продуктов
        """
        Product.objects.create(**self.product_data)

        response = self.client.get(reverse("product-list-create"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        products = response.json()
        self.assertEqual(len(products), 1)
        self.assertEqual(products[0]["name"], "Test Product")
        self.assertEqual(products[0]["price"], "9.99")
