from .models import Playlist, Artist, Song
from rest_framework import serializers
from accounts.models import User

class UserSerializer(serializers.HyperlinkedModelSerializer):
    playlists = serializers.HyperlinkedRelatedField(
        view_name='playlist_detail',
        many=True,
        read_only=True
    )

    user_url = serializers.ModelSerializer.serializer_url_field(
        view_name='user_detail'
    )

class PlaylistSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name='user_detail',
        many=True,
        read_only=True
    )

    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='user'
    )
    
    class Meta:
        model = Playlist
        fields = ('id', 'user', 'name', 'user_id', 'description', 'songs')


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    songs = serializers.HyperlinkedRelatedField(
        view_name='song_detail',
        many=True,
        read_only=True
    )

    artist_url = serializers.ModelSerializer.serializer_url_field(
        view_name='artist_detail'
    )

    class Meta:
        model = Artist
        fields = ('id', 'name', 'bio', 'artist_image', 'artist_url', 'songs')


class SongSerializer(serializers.HyperlinkedModelSerializer):
    artist = serializers.HyperlinkedRelatedField(
        view_name='artist_detail',
        read_only=True
    )

    artist_id = serializers.PrimaryKeyRelatedField(
        queryset=Artist.objects.all(),
        source='artist'
    )

    playlist = PlaylistSerializer(
        many=True,
        read_only=True
    )

    song_url = serializers.ModelSerializer.serializer_url_field(
        view_name='song_detail'
    )

    class Meta:
        model = Song
        fields = ('id', 'artist', 'artist_id', 'playlist', 'name', 'song_image', 'song_file', 'song_url')

