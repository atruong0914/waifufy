import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios' 
import { Card, CardMedia, CardContent, Button, Typography, CardActions } from '@mui/material'
import { useEffect } from 'react'


export default function Artist({ id, name, bio, artist_image, songs,}) {
    const navigate = useNavigate()

    const updatePage = (id) => {
        navigate(`/artists/${id}`)
    }
    console.log(songs)
    // useEffect(() => {
    // }, [])
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
            {songs.map((song, index) => (
                <p>{song.name}</p>
            ))}
          </CardContent>
          <CardActions>
            <Button size='small' onClick={()=>{updatePage(id)}}>Edit</Button>
          </CardActions>
            
    
    
    </div>
  )
}
