# app/api_router.py

from rest_framework.routers import DefaultRouter
from users.views import UserViewSet
from dashboard.views import TemperatureViewSet, CoastlineViewSet

router = DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"temperature", TemperatureViewSet, basename="temperature")
router.register(r"coastline", CoastlineViewSet, basename="coastline")

urlpatterns = router.urls