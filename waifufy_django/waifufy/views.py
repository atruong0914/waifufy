from .serializers import UserSerializer, PlaylistSerializer, ArtistSerializer, SongSerializer
from .models import Playlist, Artist, Song
from rest_framework import generics, permissions, filters
from accounts.models import User
from rest_framework.permissions import IsAuthenticated

# Create your views here
class UserList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PlaylistList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer


class PlaylistDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer


class ArtistList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class ArtistDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class SongList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Song.objects.all()
    serializer_class = SongSerializer


class SongDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Song.objects.all()
    serializer_class = SongSerializer


#  song search
class SongListFilter(generics.ListAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    filter_songs = [filters.SearchFilter]
    search_fields = ['^slug']
