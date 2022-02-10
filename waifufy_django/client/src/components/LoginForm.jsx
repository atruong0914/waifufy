import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Login } from '../services/Auth'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

export default function LoginForm(props) {
    const navigate = useNavigate()
    const [formVal, setFormVal] = useState({email: '', password: ''})

    const handleChange = (e) => {
        setFormVal({ ...formVal, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = await Login(formVal)
        // reset form
        setFormVal({ email: '', password: '' })
        // take payload, update user state
        props.setUser(payload)
        // set user, toggle auth true
        props.toggleAuthenticated(true)
        props.getAuthUser()
        // redirect to home page
        navigate('/')
    }

  return (
    <div>
    <Box 
      onSubmit={handleSubmit}
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
      id="username"
      label="Username"
      onChange={handleChange}
      value={formVal.email}
    />
    <TextField
      required
      id="password"
      label="Password"
      type="password"
      autoComplete="current-password"
      onChange={handleChange}
      value={formVal.password}
    />
    </div>
    <Button disabled={ !formVal.email || !formVal.password } variant='outlined'>Log In</Button>
    </Box>
    </div>
  )
}
