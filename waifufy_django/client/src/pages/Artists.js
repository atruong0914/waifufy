// import { useEffect, useState } from 'react'
// import { useParams, useNavigate, Link } from 'react-router-dom'
// import axios from 'axios'
// import { BASE_URL } from '../globals'

// export default function Artists() {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [loading, setLoading] = useState(true)

//   const [artists, setArtists] = useState([])

//   useEffect(() => {
//     async function getArtists() {
//       let artists = await axios.get(`${BASE_URL}artists/`)
//       setArtists(artists.data.artists)
//     }
//   }, [])
  
//   return (
//     <div className='artist-display'>
//       <div className='artist-header'>
//         header
//       </div>
//       <div className='artists'>
//         {artists.map((artist, index) => (
//           <Artist
//           key={index}
//           id={artist.id}
//           name={artist.name}
//           bio={artist.bio}
//           artist_image={artist.artist_image}
//           songs={artist.songs}
//           />
//         ))}
//       </div>
    
    
//     </div>
//   )
// }
