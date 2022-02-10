from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

app_name = 'waifufy'


router = DefaultRouter()

router.register('users', views.UserList, basename='user')
router.register('playlists', views.PlaylistList, basename='playlist')
router.register('artists', views.ArtistList, basename='artist')
router.register('songs', views.SongList, basename='song')



urlpatterns = router.urls
