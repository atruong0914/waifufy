import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../globals'
import Artist from '../components/Artist'

export default function Artists() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const [artists, setArtists] = useState([])

  const getArtists = async () => {
    // console.log(localStorage.getItem('token'))
    const res = await axios.get(`${BASE_URL}artists/`, {
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    })
    setArtists(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getArtists()
  }, [id])

  if (loading) {
    return ( <div>Loading...</div> )
  }

  return (
    <div className='artist-display'>
      <div className='artist-header'>
        header
      </div>
      <div className='artists'>
        {artists.map((artist, index) => (
          <Artist
          key={index}
          id={artist.id}
          name={artist.name}
          bio={artist.bio}
          artist_image={artist.artist_image}
          songs={artist.songs}
          />
        ))}
      </div>
    
    
    </div>
  )
}
