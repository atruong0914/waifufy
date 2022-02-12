import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardMedia, CardContent, Button, Typography, CardActions } from '@mui/material'



export default function Artist({ id, name, bio, artist_image, songs,}) {
    const navigate = useNavigate()

    const updatePage = (id) => {
        navigate(`/artists/${id}`)
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
                <Link to='/songs/:id'> {song.name}, </Link>
            ))}
            </p>
          </CardContent>
          <CardActions>
            <Button size='small' onClick={()=>{updatePage(id)}}>Edit</Button>
          </CardActions>
    </div>
  )
}
