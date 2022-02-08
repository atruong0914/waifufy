from django.db import models
from django.conf import settings


class Playlist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='playlists')
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=250)

    def __str__(self):
        return self.name

class Artist(models.Model):
    name = models.CharField(max_length=100)
    bio = models.TextField(max_length=50)
    artist_image = models.ImageField(upload_to='artists', blank=True, null=True)

    def __str__(self):
        return self.name

class Song(models.Model):
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE, related_name='songs')
    playlist = models.ManyToManyField(Playlist, related_name='songs')
    name = models.CharField(max_length=100)
    song_image = models.ImageField(upload_to='songs', blank=True, null=True)
    song_file = models.FileField(upload_to='songs', blank=True, null=True)

    def __str__(self):
        return self.name
