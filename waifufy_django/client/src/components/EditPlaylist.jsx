import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../globals'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Card, CardMedia, CardContent } from '@mui/material';
import Client from '../services/api';

export default function EditPlaylist() {
  const [formVal, setFormVal] = useState({ 
    name:'', 
    description:'' 
  })
  const [playlist, setPlaylist] = useState({})
  const [loading, setLoading] = useState(true)
  const { playlistId } = useParams()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormVal({ ...formVal, [e.target.id]: e.target.value })
    // console.log(formVal)
  }

  const getSelectedPlaylist = async () => {
    const res = await axios.get(`${BASE_URL}playlists/${playlistId}/`, {
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    })
    setPlaylist(res.data)
    setLoading(false)
  }

  const handleDelete = async (e) => {
    const res = await Client.delete(`/playlists/${playlistId}/`)
    .then((res) => {
      console.log(res)
      navigate(-1)
    })
    return res
  }

  useEffect(() => {
    getSelectedPlaylist()
  }, [playlistId])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', formVal.name)
    formData.append('description', formVal.bio)
    formData.append('user_id', playlist.user_id)
    console.log(formData)
    const res = await Client.put(`/playlists/${playlistId}/`,
    formData,
    {
      headers: {
        'content-type': 'multipart/form-data',
      }}
      ).then((res) => {
        console.log(res)
        navigate(-1)
      })
      return res
  }


  if (loading) {
    return ( <div>Loading...</div> )
  }

  return (
    <div>
    <Card sx={{ maxWidth: 300 }}/>
    <Box 
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <CardContent>
    <TextField
      required
      id="name"
      label="playlist name"
      defaultValue={`${playlist.name}`}
      onChange={handleChange}
    />
    <TextField
      required
      id="description"
      label="playlist description"
      defaultValue={`${playlist.description}`}
      onChange={handleChange}
    />
    </CardContent>
    <Button
    variant='outlined'
    onClick={handleSubmit}>
      submit
    </Button>
    <Button
    variant='contained'
    onClick={handleDelete}>
      delete
    </Button>
    </Box>
    </div>
  )
}

