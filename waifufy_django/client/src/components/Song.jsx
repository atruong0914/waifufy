import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardMedia, CardContent, Button, Typography, CardActions } from '@mui/material'


export default function Song({ id, name, song_image, song_file, artist, artist_id}) {
    const navigate = useNavigate()

    const updatePage = (id) => {
        navigate(`/songs/${id}`)
    }

    const artistSelection = (artist_id) => {
        navigate(`/artists/${artist_id}`)
    }

  return (
    <div className='artist'>
        <Card sx={{ maxWidth: 300 }}/>
          <CardMedia
            component='img'
            height='500'
            image={song_image}
            alt={name}
          />
          <CardContent>
            <Typography gutterBottom variant='h4' component='div'>
                name:{name}
            </Typography>
            artist:
            <Button size='small' onClick={()=>{artistSelection(`${artist_id}`)}}> {artist}, </Button>
          </CardContent>
          <CardActions>
            <Button size='small' onClick={()=>{updatePage(id)}}>Edit</Button>
          </CardActions>
    </div>
  )
}
