import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Register } from '../services/Auth'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const iState = { 
  first_name:'', 
  last_name:'' ,
  email:'', 
  username: '', 
  password: '', 
  password2: '', 
}

export default function RegisterForm(props) {
    const navigate = useNavigate()
    const [formVal, setFormVal] = useState({ 
      first_name:'', 
      last_name:'' ,
      email:'', 
      username: '', 
      password: '', 
      password2: '',
    })
    const [selectedAvatar, setSelectedAvatar] = useState()
    const [isAvatarPicked, setAvatarPicked] = useState(false)

    const handleChange = (e) => {
      setFormVal({ ...formVal, [e.target.id]: e.target.value })
      // console.log(formVal)
    }

    const handleAvatarChange = (e) => {
      setSelectedAvatar(e.target.files[0])
      setAvatarPicked(true)
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('avatar', selectedAvatar)
      formData.append('email', formVal.email)
      formData.append('username', formVal.username)
      formData.append('first_name', formVal.first_name)
      formData.append('last_name', formVal.last_name)
      formData.append('password', formVal.password)
      
      const res = await Register(
        formData,
        {is_active: true}
      ).then((res) => {
        console.log(res)
        navigate('/')
      })
      return res
      console.log('submitted')
      // setFormVal(iState)
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
   <div className='text'>
   <TextField
      required
      id="first_name"
      label="First Name"
      onChange={handleChange}
      defaultValue={formVal.first_name}
    />
   <TextField
      required
      id="last_name"
      label="Last Name"
      onChange={handleChange}
      defaultValue={formVal.last_name}
    />
   <TextField
      required
      id="email"
      label="Email"
      type='email'
      onChange={handleChange}
      defaultValue={formVal.email}
    />
    <TextField
      required
      id="username"
      label="Username"
      onChange={handleChange}
      defaultValue={formVal.username}
    />
    <TextField
      required
      id="password"
      label="Password"
      type="password"
      onChange={handleChange}
      defaultValue={formVal.password}
    />
    <TextField
      required
      id="password2"
      label="Confirm Password"
      type="password"
      onChange={handleChange}
      defaultValue={formVal.password2}
    />
      <input
      required
      accept='image/png, image/jpeg'
      id="avatar"
      label="choose file"
      type="file"
      onChange={handleAvatarChange}
      // defaultValue={avatar !== null ? avatar.avatar : ''}
    />
    {isAvatarPicked ? (
			<div>
				<p>Filename: {selectedAvatar.name}</p>
				<p>Filetype: {selectedAvatar.type}</p>
				<p>Size in bytes: {selectedAvatar.size}</p>
				<p>
					lastModifiedDate:{' '}
					{selectedAvatar.lastModifiedDate.toLocaleDateString()}
				</p>
			</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div></div>
    </div>
    <Button 
      disabled={ 
      !formVal.email && !formVal.username && !formVal.first_name && !formVal.last_name || 
      !formVal.password && formVal.password2 === formVal.password
    } 
      variant='outlined' 
      onClick={handleSubmit}>
        Register
    </Button>
    </Box>
    </div>
  )
}