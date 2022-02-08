from .models import Playlist, Artist, Song
from rest_framework import serializers
from accounts.models import User


class ArtistSerializer(serializers.HyperlinkedModelSerializer):

    songs = serializers.PrimaryKeyRelatedField(
        queryset=Song.objects.all(),
        many=True,
    )

    class Meta:
        model = Artist
        fields = ('id', 'name', 'bio', 'artist_image', 'songs')


class SongSerializer(serializers.ModelSerializer):
    artist = serializers.PrimaryKeyRelatedField(
        read_only=True
    )

    artist_id = serializers.PrimaryKeyRelatedField(
        queryset=Artist.objects.all(),
        source='artist'
    )

    playlist = serializers.PrimaryKeyRelatedField(
        queryset=Playlist.objects.all(),
        many=True
    )


    class Meta:
        model = Song
        fields = ('id', 'artist', 'artist_id', 'playlist', 'name', 'song_image', 'song_file')


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
    # playlists = PlaylistSerializer(
    #     many=True,
    #     read_only=True
    # )
    playlists = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True
    )


    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'username', 'password', 'avatar', 'playlists')
