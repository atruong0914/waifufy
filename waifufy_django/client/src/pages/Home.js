import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../globals'
import { CardMedia } from '@mui/material'

import MusicPlayer from '../components/MusicPlayer'

export default function Home() {
  const { playlistId } = useParams()
  const [loading, setLoading] = useState(true)
  const [allSongs, setAllSongs] = useState([])

  const getPlaylists = async () => {
    const res = await axios.get(`${BASE_URL}songs/`, {
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    })
    // allSongs.push(...res.data)
    setAllSongs(res.data)
    setLoading(false)
  }
  // console.log(allSongs)
  useEffect(() => {
    getPlaylists()
  }, [playlistId])

  if (loading) {
    return ( <div>loading Playlists...</div> )
  }
  return (
    <div>
    <>
    
      <MusicPlayer
      songs={allSongs}
      />

    </>
    </div>
  )
}
