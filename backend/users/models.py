# users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    display_name = models.CharField(max_length=64, blank=True)