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
  password1: '', 
  password2: '', 
  avatar: null
}

export default function RegisterForm(props) {
    const navigate = useNavigate()
    const [formVal, setFormVal] = useState({ 
      first_name:'', 
      last_name:'' ,
      email:'', 
      username: '', 
      password1: '', 
      password2: '', 
      avatar: null
    })

    const handleChange = (e) => {
      setFormVal({ ...formVal, [e.target.id]: e.target.value })
    }

    const handleAvatarChange = (e) => {
      setAvatar({ ...formVal, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      await Register({
        first_name: formVal.first_name,
        last_name: formVal.last_name,
        email: formVal.email,
        username: formVal.username,
        password: formVal.password,
        avatar: 
      })
      setFormVal(iState)
      navigate('/')
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
      id="password1"
      label="Password"
      type="password"
      onChange={handleChange}
      defaultValue={formVal.password1}
    />
    <TextField
      required
      id="password2"
      label="Confirm Password"
      type="password"
      onChange={handleChange}
      defaultValue={formVal.password2}
    />
      <TextField
      required
      accept='image/png, image/jpeg'
      id="avatar"
      label="choose file"
      type="file"
      onChange={handleChange}
      defaultValue={formVal.avatar}
    />
    </div>
    <Button 
      disabled={ 
      !formVal.email && !formVal.username && !formVal.first_name && !formVal.last_name || 
      !formVal.password1 && formVal.password2 === formVal.password1
    } 
      variant='outlined' 
      onClick={handleSubmit}>
        Register
    </Button>
    </Box>
    </div>
  )
}