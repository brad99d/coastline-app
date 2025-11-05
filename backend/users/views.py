# users/views.py

from django.shortcuts import render
from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer

# Create your views here.
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Allows anyone to retrieve user profiles.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []