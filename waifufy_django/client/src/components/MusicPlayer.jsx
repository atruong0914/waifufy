import { useState, useContext } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { Card, CardMedia, CardContent, Button, Typography, CardActions } from '@mui/material'


export default function MusicPlayer({ id, name, songs}) {
    const navigate = useNavigate()
    const [currentSong, setCurrentSong] = useState(0)
    
    const song = songs[currentSong]
    
    if(!song) return null
    
    const songPlaying = () => {
      console.log(`${song.name} is playing`)
    }
    
    const aboutPage = () => {
      navigate(`/about`)
    }
return (
    <div className='artist'>
        <Card sx={{ maxWidth: 300 }}/>
          <CardContent>
            <Typography gutterBottom variant='h4' component='div'>
              name:{name}
            </Typography>
           </CardContent>
        <CardMedia
          component='audio'
          src={song.song_file}
          onPlay={() => (songPlaying)}
          onEnded={() => setCurrentSong( i => i + 1 )}
          autoPlay={true}
          controls
          alt='playlist song'
        />
        <div>{song.name} is playing!</div>
          <CardActions>
            <Button variant='outlined' size='small' onClick={()=>{aboutPage()}}>Learn More</Button>
          </CardActions>
    </div>
  )
}
