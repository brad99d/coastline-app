# dashboard/apps.py

from django.apps import AppConfig
from django.conf import settings
import csv
from pathlib import Path

class DashboardConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'dashboard'

    def ready(self):

        # seed temperature data if not exists
        from dashboard.models import Temperature
        if Temperature.objects.count() == 0:
            path = Path("data/global_temp.csv")
            if path.exists():
                with path.open() as f:
                    for row in csv.DictReader(f):
                        Temperature.objects.update_or_create(
                            year=int(row['year']),
                            defaults={'temperature': float(row['temperature'])}
                        )
                print('Seeded temperature table.')