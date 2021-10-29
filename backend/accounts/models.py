from django.db import models
from django.utils import timezone
from django.contrib.auth.models import (
    AbstractUser,
    BaseUserManager
)

class PoetAccountManager(BaseUserManager):
    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        return self.create_user(email, password, **extra_fields)
    
    def create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        poet = self.model(email=email, **extra_fields)
        poet.set_password(password)
        poet.save()
        return poet

class PoetAccount(AbstractUser):
    email = models.EmailField(unique=True)
    pen_name = models.CharField(max_length=200, unique=True)
    bio = models.TextField(null=True, blank=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['pen_name']

    objects = PoetAccountManager()

    def __str__(self):
        return self.email