from django.db import models
from django.utils import timezone
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager
)

class UserAccountManager(BaseUserManager):
    def create_superuser(self, pen_name, email, password):
        user = self.create_user(pen_name, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user

    def create_user(self, pen_name, email, password):
        email = self.normalize_email(email)
        user = self.model(pen_name=pen_name, email=email)
        user.set_password(password)
        user.save()
        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    pen_name = models.CharField(max_length=200, unique=True)
    bio = models.TextField(max_length=500, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'pen_name'
    REQUIRED_FIELDS = ['email']

    objects = UserAccountManager()

    def __str__(self):
        return self.pen_name