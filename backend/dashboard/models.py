# dashboard/models.py

from django.contrib.gis.db import models

# Create your models here.
class Temperature(models.Model):
    year = models.IntegerField(unique=True)
    temperature = models.FloatField()

    def __str__(self):
        return f"{self.year}: {self.temperature}"

class Region(models.Model):
    year = models.IntegerField(null=True)
    certainty = models.CharField(max_length=50, null=True)
    tide_datum = models.CharField(max_length=50, null=True)
    geometry = models.MultiLineStringField(srid=3577)