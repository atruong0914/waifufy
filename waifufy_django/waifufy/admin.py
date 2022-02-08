from django.contrib import admin
from .models import Playlist, Artist, Song
from django.contrib.auth.admin import UserAdmin
from accounts.models import User

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(Playlist)
admin.site.register(Artist)
admin.site.register(Song)
