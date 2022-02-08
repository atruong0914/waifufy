from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

app_name = 'waifufy'

urlpatterns = [
    path('users/', views.UserList.as_view(), name='user_list'),
    path('users/<int:pk>', views.UserDetail.as_view(), name='user_detail'),
    path('playlists/', views.PlaylistList.as_view(), name='playlist_list'),
    path('playlists/<int:pk>', views.PlaylistDetail.as_view(), name='playlist_detail'),
    path('artists/', views.ArtistList.as_view(), name='artist_list'),
    path('artists/<int:pk>', views.ArtistDetail.as_view(), name='artist_detail'),
    path('songs/', views.SongList.as_view(), name='song_list'),
    path('songs/<int:pk>', views.SongDetail.as_view(), name='song_detail')
]