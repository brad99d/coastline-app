# dashboard/signals.py

from django.db.models.signals import post_migrate
from django.dispatch import receiver
from dashboard.models import Temperature, SeaLevel
from pathlib import Path
import csv

@receiver(post_migrate)
def load_temperature_data(sender, **kwargs):
    if sender.name != "dashboard":
        return

    path = Path('data/global_temp.csv')
    if not path.exists():
        return

    with path.open() as f:
        for row in csv.DictReader(f):
            Temperature.objects.update_or_create(
                year=int(row['year']),
                defaults={'temperature': float(row['temperature'])}
            )

@receiver(post_migrate)
def load_sealevel_data(sender, **kwargs):
    if sender.name != "dashboard":
        return

    path = Path('data/global_sea_level.csv')
    if not path.exists():
        return

    with path.open() as f:
        for row in csv.DictReader(f):
            SeaLevel.objects.update_or_create(
                year=int(row['year']),
                defaults={'level': float(row['gmsl_cm'])}
            )