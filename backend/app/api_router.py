# app/api_router.py

from rest_framework.routers import DefaultRouter
from users.views import UserViewSet
from dashboard.views import TemperatureViewSet, SeaLevelViewSet

router = DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"temperature", TemperatureViewSet, basename="temperature")
router.register(r"sealevel", SeaLevelViewSet, basename="sealevel")

urlpatterns = router.urls