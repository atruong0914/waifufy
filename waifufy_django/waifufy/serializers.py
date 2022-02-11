from .models import Playlist, Artist, Song
from rest_framework import serializers
from accounts.models import User


class SongSerializer(serializers.ModelSerializer):
    artist = serializers.PrimaryKeyRelatedField(
        read_only=True
    )

    playlist = serializers.PrimaryKeyRelatedField(
        queryset=Playlist.objects.all(),
        many=True,
    )


    class Meta:
        model = Song
        fields = ('id', 'artist', 'playlist', 'name', 'song_image', 'song_file')

class ArtistSerializer(serializers.ModelSerializer):

    songs = SongSerializer(
        read_only=True,
        many=True,
    )


    class Meta:
        model = Artist
        fields = ('id', 'name', 'bio', 'artist_image', 'songs')



class PlaylistSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        read_only=True
    )

    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='user'
    )

    songs = SongSerializer(
        many=True,
        read_only=True
    )
    
    class Meta:
        model = Playlist
        fields = ('id', 'user', 'name', 'user_id', 'description', 'songs')


class UserSerializer(serializers.HyperlinkedModelSerializer):

    playlists = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )


    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'username', 'password', 'avatar', 'playlists')
