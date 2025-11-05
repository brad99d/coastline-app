# dashboard/serializers.py
from rest_framework import serializers
from .models import Temperature, SeaLevel

class TemperatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Temperature
        fields = ["year", "temperature"]

class SeaLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeaLevel
        fields = ["year", "level"]