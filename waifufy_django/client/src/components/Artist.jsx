import React from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { Card, CardMedia, CardContent, Button, Typography, CardActions } from '@mui/material'



export default function Artist({ id, name, bio, artist_image, songs, }) {
    const navigate = useNavigate()
    const updatePage = (id) => {
      navigate(`/artists/${id}`)
    }
      
    const songSelection = (songId) => {
      navigate(`/songs/${songId}`)
    }

  return (
    <div className='artist'>
        <Card sx={{ maxWidth: 300 }}/>
          <CardMedia
            component='img'
            height='500'
            image={artist_image}
            alt={name}
          />
          <CardContent>
            <Typography gutterBottom variant='h4' component='div'>
                name:{name}
            </Typography>
            <Typography variant='body'>
                about:{bio}
            </Typography>
            <p> songs: 
            {songs.map((song, index) => (
                <Button size='small' onClick={()=>{songSelection(`${song.id}`)}}> {song.name}, </Button>
            ))}
            </p>
          </CardContent>
          <CardActions>
            <Button variant='outlined' size='small' onClick={()=>{updatePage(id)}}>Edit</Button>
          </CardActions>
    </div>
  )
}
