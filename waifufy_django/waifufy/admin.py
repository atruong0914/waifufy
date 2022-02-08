from django.contrib import admin
from .models import Playlist, Artist, Song
from django.contrib.auth.admin import UserAdmin
from accounts.models import User
from accounts.forms import CustomUserCreationForm, CustomUserChangeForm
from accounts.models import User


class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff', 'is_active',)
    list_filter = ('email', 'username', 'first_name', 'last_name', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'username', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('email', 'username', 'first_name', 'last_name',)
    ordering = ('email', 'username', 'first_name', 'last_name',)


# Register your models here.
admin.site.register(User, CustomUserAdmin)
admin.site.register(Playlist)
admin.site.register(Artist)
admin.site.register(Song)
