# dashboard/apps.py

from django.apps import AppConfig

class DashboardConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'dashboard'

    def ready(self):
        from pathlib import Path
        import csv
        from django.db.utils import OperationalError, ProgrammingError
        from dashboard.models import Temperature

        # seed temperature data if not exists
        try:
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
        except (OperationalError, ProgrammingError):
            return