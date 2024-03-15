from django.db import models
from django.contrib.auth.models import AbstractUser
from Auth.manager import CustomUserManager



class UserProfile(AbstractUser):
    username = None
    email = models.EmailField(verbose_name='email address', unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = CustomUserManager()


    class Meta:
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'
        db_table = 'user_profile'

    def __str__(self):
        return self.email