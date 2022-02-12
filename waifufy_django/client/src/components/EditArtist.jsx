import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../globals'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { UpdateArtist } from '../services/Auth';
import Client from '../services/api';

export default function EditArtist() {
  const [formVal, setFormVal] = useState({ 
    name:'', 
    bio:'' 
  })
  const [selectedImage, setSelectedImage] = useState()
  const [isImagePicked, setImagePicked] = useState(false)
  const [artist, setArtist] = useState({})
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormVal({ ...formVal, [e.target.id]: e.target.value })
    console.log(formVal)
  }

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0])
    setImagePicked(true)
    console.log(selectedImage)
  }

  const getSelectedArtist = async () => {
    const res = await axios.get(`${BASE_URL}artists/${id}/`, {
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    })
    // console.log({headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
    setArtist(res.data)
    setLoading(false)
  }

  useEffect(() => {
    getSelectedArtist()
  }, [id])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', formVal.name)
    formData.append('bio', formVal.bio)
    formData.append('artist_image', selectedImage)
    console.log(formData)
    const res = await Client.put(`/artists/${id}/`,
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
    <Box 
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <div className='text-edit'>
    <TextField
      required
      id="name"
      label="artist name"
      defaultValue={`${artist.name}`}
      onChange={handleChange}
    />
    <TextField
      required
      id="bio"
      label="artist bio"
      defaultValue={`${artist.bio}`}
      onChange={handleChange}
    />
    <input
    required
    accept='image/png, image/jpeg'
    id='artist'
    label='choose file'
    type='file'
    onChange={handleImageChange}
    />
    {isImagePicked ? (
			<div>
				<p>Filename: {selectedImage.name}</p>
				<p>Filetype: {selectedImage.type}</p>
				<p>Size in bytes: {selectedImage.size}</p>
				<p>
					lastModifiedDate:{' '}
					{selectedImage.lastModifiedDate.toLocaleDateString()}
				</p>
			</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div></div>
    </div>
    <Button
    variant='outlined'
    onClick={handleSubmit}>
      submit
    </Button>
    </Box>
    </div>
  )
}
