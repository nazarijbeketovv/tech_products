from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "description", "price"]

    def validate(self, data):
        if data["price"] <= 0:
            raise serializers.ValidationError("Price must be a positive number.")
        if not data["name"].strip():
            raise serializers.ValidationError("Name cannot be empty.")
        return data
