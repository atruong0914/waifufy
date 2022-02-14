import Client from './api'



export const Login = async (data) => {
  try {
    const res = await Client.post('/login/', data)
    // Set the current signed in users token to localstorage
    localStorage.setItem('token', res.data.access)
    localStorage.setItem('refresh', res.data.refresh)
    localStorage.setItem('id', res.data.user.id)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const Register = async (data) => {
  console.log('banana')
  try {
    console.log(data)
    const res = await Client.post('/register/', data,{
      // credentials: 'include',
      headers: {
        'content-type': 'multipart/form-data'
      }})
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('refresh', res.data.refresh)
    localStorage.setItem('id', res.data.user.id)
    
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    // Checks if the current token if it exists is valid
    const refresh = localStorage.getItem('refresh')
    const res = await Client.post('/refresh/', { refresh })
    localStorage.setItem('token', res.data.access)
    // localStorage.setItem('id', res.data.user.id)
    return res.data.user
  } catch (error) {
    throw error
  }
}

