import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../globals'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Card, CardMedia, CardContent } from '@mui/material';
import Client from '../services/api';

export default function EditSong() {
  const [formVal, setFormVal] = useState({ 
    name:''
  })
  const [selectedImage, setSelectedImage] = useState()
  const [selectedFile, setSelectedFile] = useState()
  const [isImagePicked, setImagePicked] = useState(false)
  const [isFilePicked, setFilePicked] = useState(false)
  const [song, setSong] = useState({})
  const [loading, setLoading] = useState(true)
  const { songId } = useParams()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormVal({ ...formVal, [e.target.id]: e.target.value })
    // console.log(formVal)
  }

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0])
    setImagePicked(true)
    console.log(selectedImage)
  }

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0])
    setFilePicked(true)
    console.log(selectedFile)
  }

  const getSelectedSong = async () => {
    const res = await axios.get(`${BASE_URL}songs/${songId}/`, {
      headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
    })
    setSong(res.data)
    setLoading(false)
  }

  const handleDelete = async (e) => {
    const res = await Client.delete(`/songs/${songId}/`)
    .then((res) => {
      console.log(res)
      navigate(-1)
    })
    return res
  }

  useEffect(() => {
    getSelectedSong()
  }, [songId])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', formVal.name)
    formData.append('song_image', selectedImage)
    formData.append('song_file', selectedFile)
    console.log(formData)
    const res = await Client.put(`/songs/${songId}/`,
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
    <CardMedia
      component='img'
      height='500'
      image={`${song.song_image}`}
      alt={`${song.name}`}
          />
    <CardMedia
      component='audio'
      src={`${song.song_file}`}
      controls
      alt='music'
      />
    <CardContent>
    <TextField
      required
      id="name"
      label="song name"
      defaultValue={`${song.name}`}
      onChange={handleChange}
    />
    <CardContent>pick an image!</CardContent>
    <input
    required
    accept='image/png, image/jpeg'
    id='song'
    label='choose image'
    type='file'
    onChange={handleImageChange}
    />
    <CardContent>pick an mp3!</CardContent>
    <input
    required
    accept='audio/mp3'
    id='song'
    label='choose mp3'
    type='file'
    onChange={handleFileChange}
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
				<p>Select a file to show image details</p>
			)}
      {isFilePicked ? (
			<div>
				<p>Filename: {selectedFile.name}</p>
				<p>Filetype: {selectedFile.type}</p>
				<p>Size in bytes: {selectedFile.size}</p>
				<p>
					lastModifiedDate:{' '}
					{selectedFile.lastModifiedDate.toLocaleDateString()}
				</p>
			</div>
			) : (
				<p>Select a file to show song details</p>
			)}
			<div></div>
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
