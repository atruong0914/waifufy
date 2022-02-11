import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Login, Register } from '../services/Auth'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import RegisterForm from './Register'

export default function LoginForm(props) {
    const navigate = useNavigate()
    const [formVal, setFormVal] = useState({username: '', password: ''})

    const handleChange = (e) => {
      setFormVal({ ...formVal, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      const payload = await Login(formVal)
      // reset form
      setFormVal({ username: '', password: '' })
      // take payload, update user state
      props.setUser(payload)
      // set user, toggle auth true
      props.toggleAuthenticated(true)
      props.getAuthUser()
      // redirect to home page
      navigate('/')
      console.log('submitted')
    }

    const RegisterButton = (e) => {
      navigate('/register')
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
      autoComplete="current-password"
      onChange={handleChange}
      defaultValue={formVal.password}
    />
    </div>
    <Button disabled={ !formVal.username || !formVal.password } variant='outlined' onClick={handleSubmit}>Log In</Button>
    <Button onClick={RegisterButton}>Register</Button>
    </Box>
    </div>
  )
}