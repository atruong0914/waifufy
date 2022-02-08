from django.urls import path
from .views import UserCreate
from django.contrib.auth import views as auth_views
# from rest_framework.routers import DefaultRouter

app_name = 'accounts'

urlpatterns = [
    path('register/', UserCreate.as_view(), name='user_create'),
    path('accounts/login/', auth_views.LoginView.as_view(), name='user_login'),
    path('accounts/logout/', auth_views.LogoutView.as_view(), name='user_logout'),
]
