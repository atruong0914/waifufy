import { useState, useContext } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { Card, CardMedia, CardContent, Button, Typography, CardActions, IconButton } from '@mui/material'
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';

export default function MusicPlayer({ id, name, songs, allSongs}) {
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

    // const nextBtn = () => {
    //   if (currentSong < allSongs -1){
    //     setCurrentSong(currentSong + 1)
    //   } else {
    //     setCurrentSong(0)
    //   }
    // }

    // const prevBtn = () => {
    //   if (currentSong - 1 < 0){
    //     setCurrentSong(allSongs - 1)
    //   } else {
    //     setCurrentSong(currentSong - 1)
    //   } 
    // }

return (
    <div className='artist'>
        <Card sx={{ maxWidth: 300 }}/>
          <CardContent>
            <Typography gutterBottom variant='h4' component='div' className='song-name'>
              song name: {song.name}
            </Typography>
           </CardContent>
        <CardMedia
          component='img'
          src={song.song_image}
          />
        <CardMedia
          component='audio'
          src={song.song_file}
          onPlay={() => (songPlaying)}
          onEnded={() => setCurrentSong( i => i + 1 )}
          autoPlay={true}
          controls
          alt='playlist song'
        />
        {/* <IconButton onClick={() => {prevBtn()}}> 
          <SkipPreviousIcon/>
        </IconButton>
        <IconButton onClick={() => {nextBtn()}}>
          <SkipNextIcon />
        </IconButton> */}
        <div className='song-playing'>{song.name} is playing!</div>
          <CardActions>
            <Button variant='outlined' size='small' onClick={()=>{aboutPage()}}>Learn More</Button>
          </CardActions>
    </div>
  )
}
