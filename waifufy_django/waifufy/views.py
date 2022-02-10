from .serializers import UserSerializer, PlaylistSerializer, ArtistSerializer, SongSerializer
from .models import Playlist, Artist, Song
from rest_framework import generics, permissions, filters, viewsets
from accounts.models import User
from rest_framework.permissions import IsAuthenticated


# Create your views here
class UserList(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class PlaylistList(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Playlist.objects.all()
    serializer_class = PlaylistSerializer


class ArtistList(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer


class SongList(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SongSerializer
    queryset = Song.objects.all()


#  song search
class SongListFilter(generics.ListAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    filter_songs = [filters.SearchFilter]
    search_fields = ['^slug']
