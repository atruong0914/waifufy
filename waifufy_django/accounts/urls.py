from django.urls import path
from .views import UserCreate
# from rest_framework.routers import DefaultRouter

app_name = 'accounts'

urlpatterns = [
    path('register/', UserCreate.as_view(), name='user_create'),
]
