import { useState, useContext } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { Card, CardMedia, CardContent, Button, Typography, CardActions } from '@mui/material'



export default function Playlist({ id, name, description, songs }) {
    const navigate = useNavigate()
    const [currentSong, setCurrentSong] = useState(0)

    const song = songs[currentSong]

    if(!song) return null

    const songPlaying = () => {
        <div>{song.name} is playing</div>
    }

    const updatePage = (playlistId) => {
      navigate(`/playlists/${playlistId}`)
    }
      
    const songSelection = (songId) => {
      navigate(`/songs/${songId}`)
    }

  return (
    <div className='artist'>
        <Card sx={{ maxWidth: 300 }}/>
          <CardContent>
            <Typography gutterBottom variant='h4' component='div'>
              name:{name}
            </Typography>
            <Typography variant='body'>
              description:{description}
            </Typography>
            <p> songs: 
            {songs.map((song, index) => (
            <>
              <CardMedia
                component='img'
                height='100'
                image={song.song_image}
                alt={song.name}
              />
              <Button size='small' onClick={()=>{songSelection(`${song.id}`)}}> {song.name}, </Button>
              <CardMedia
                component='audio'
                src={song.song_file}
                controls
                alt='music'
              />
            </>
            ))}
            </p>
           </CardContent>
        <CardMedia
          component='audio'
          src={song.song_file}
          onPlay={() => (songPlaying)}
          onEnded={() => setCurrentSong( i => i + 1 )}
          controls
          customAdditionalControls={[]}
          alt='playlist song'
        />
        <div>{song.name} is playing!</div>
          <CardActions>
            <Button variant='outlined' size='small' onClick={()=>{updatePage(id)}}>Edit</Button>
          </CardActions>
    </div>
  )
}
