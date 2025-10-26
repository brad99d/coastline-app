# dashboard/apps.py

from django.apps import AppConfig

from django.conf import settings

class DashboardConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'dashboard'

    def ready(self):
        from pathlib import Path
        import csv
        from django.contrib.gis.gdal import DataSource
        from django.db.utils import OperationalError, ProgrammingError
        from dashboard.models import Temperature, Region

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

        # seed geospatial data
        gpkg = Path("data/coastlines_3-0-0.gpkg")
        try:
            if gpkg.exists() and Region.objects.count() == 0:
                ds = DataSource(str(gpkg))
                layer = ds["shorelines_annual"]
                for feat in layer:
                    Region.objects.create(
                        year=feat.get('year'),
                        certainty=feat.get('certainty'),
                        tide_datum=feat.get('tide_datum'),
                        geometry=feat.geom.geos
                    )
                print('Seeded region table.')
        except (OperationalError, ProgrammingError):
            return