import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../globals'
import Playlist from '../components/Playlist'

export default function Playlists() {
  const { playlistId } = useParams()
  const [loading, setLoading] = useState(true)
  const [playlists, setPlaylists] = useState([])

  const getPlaylists = async () => {
    const res = await axios.get(`${BASE_URL}playlists/`, {
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    })
    setPlaylists(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getPlaylists()
  }, [playlistId])

  if (loading) {
    return ( <div>loading Playlists...</div> )
  }

  return (
    <>
    {playlists.map((playlist, index) => (
      <Playlist
      key={index}
      id={playlist.id}
      name={playlist.name}
      description={playlist.description}
      songs={playlist.songs}
      />
      ))}
    </>
  )


}
