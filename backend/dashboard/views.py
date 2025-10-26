# dashboard/views.py
from django.http import HttpResponse

from rest_framework import viewsets
from .models import Temperature
from .serializers import TemperatureSerializer

# Create your views here.
def index(request):
    return HttpResponse("Hello, world!")

class TemperatureViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TemperatureSerializer
    queryset = Temperature.objects.all().order_by("year")

    def get_queryset(self):
        qs = super().get_queryset()
        start = self.request.query_params.get("start")
        end = self.request.query_params.get("end")
        if start:
            qs = qs.filter(year__gte=start)
        if end:
            qs = qs.filter(year__lte=end)
        return qs