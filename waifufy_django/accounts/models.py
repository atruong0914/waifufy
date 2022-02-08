from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

# user auth and manager

class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, username, email, password, first_name, last_name, **extra_fields):
        if not email:
            raise ValueError('the email must be set.')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, first_name=first_name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password, first_name, last_name, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('superuser must be assigned to is_staff=True')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('superuser must have is_superuser=True')
            

        return self.create_user(username, email, password, first_name, last_name, **extra_fields)




# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=45)
    email = models.EmailField(max_length=100)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to='avatars')
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email']
    
    def __str__(self):
        return self.username

