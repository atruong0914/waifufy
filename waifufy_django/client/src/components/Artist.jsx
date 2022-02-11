import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios' 
import Card from '@mui/material'

export default function Artist({ id, name, bio, artist_image, songs }) {
    navigate = useNavigate()

    const updatePage = (id) => {
        navigate.push(`/artists/${id}`)
    }

  return (
    <div className='artist'>
        <img src={artist_image} alt='artist' />
        <Card />
    
    
    </div>
  )
}
