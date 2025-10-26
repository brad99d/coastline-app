# dashboard/models.py

from django.contrib.gis.db import models

# Create your models here.
class Temperature(models.Model):
    year = models.IntegerField(unique=True)
    temperature = models.FloatField()

    def __str__(self):
        return f"{self.year}: {self.temperature}"