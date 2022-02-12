import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../globals'
import axios from 'axios'
import Song from '../components/Song'

export default function Songs() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [songs, setSongs] = useState([])

  const getSongs = async () => {
    const res = await axios.get(`${BASE_URL}songs/`, {
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    })
    setSongs(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getSongs()
  }, [id])

  if (loading) {
    return ( <div>loading songs...</div> )
  }

  return (
    <>
    {songs.map((song, index) => (
      <Song
      key={index}
      id={song.id}
      name={song.name}
      song_image={song.song_image}
      song_file={song.song_file}
      artist={song.artist}
      artist_id={song.artist_id}
      />
      ))}
    </>
  )
}
