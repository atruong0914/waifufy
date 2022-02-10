import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import axios from 'axios'
import About from './pages/About'
import Artists from './pages/Artists'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Playlists from './pages/Playlists'
import Register from './pages/Register'
import Songs from './pages/Songs'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Loading from './components/Loading'
import EditArtist from './components/EditArtist'
import EditPlaylist from './components/EditPlaylist'
import EditSong from './components/EditSong'
import { BASE_URL } from './globals'

export default function App() {

  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [authUser, setAuthUser] = useState({})
  const [loading, setLoading] = useState(true)
  
  const checkToken = async () => {
    // if a token exists, send to local storage to keep user logged in
    const user = await CheckSession()
    setUser(user)
    // set user auth to true
    toggleAuthenticated(true)
  }

  const getAuthUser = async () => {
    const id = localStorage.getItem('id')
    axios.get(`${BASE_URL}users/${id}`)
    .then(res => {
      setAuthUser(res.data)
    })
  }

  const someFunc = () => {
    localStorage.setItem('a', 'bsdf')
  }
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
      getAuthUser()
      // console.log(token)
    }
    someFunc()
  }, [])

  // show nav and footer only if user is authenticated
  const navShow = () => {
    if (!authenticated) {
      return null
    } else {
      return (
        <Nav 
        authenticated={authenticated}
        toggleAuthenticated={toggleAuthenticated}
        setUser={setUser}
        authUser={authUser}
        />
      )
    }
  }
  const footShow = () => {
    if (!authenticated) {
      return null
    } else {
      return (
        <Footer 
        authenticated={authenticated}
        toggleAuthenticated={toggleAuthenticated}
        setUser={setUser}
        authUser={authUser}
        />
      )
    }
  }

  // when retrieving data from the backend, show loading if havent received yet
  // if (loading) {
  //   return ( <Loading /> )
  // }

  return (
    <div>
      { navShow() }{ footShow() }
      <Routes>
      { authenticated ? (
        <>
          <Route path='/' element={<Home authUser={authUser}/>} />
          <Route path='/about' element={<About authUser={authUser}/>} />
          <Route path='/artists' element={<Artists authUser={authUser}/>} />
          <Route path='/playlists' element={<Playlists authUser={authUser}/>} />
          <Route path='/songs' element={<Songs authUser={authUser}/>} />
          <Route path='/artists/:id' element={<EditArtist authUser={authUser}/>} />
          <Route path='/playlists/:id' element={<EditPlaylist authUser={authUser}/>} />
          <Route path='/songs/:id' element={<EditSong authUser={authUser}/>} />
        </>
      ) : (
        <>
          <Route 
          path='/' 
          element={ <Login
            setUser={setUser}
            toggleAuthenticated={toggleAuthenticated}
            getAuthedUser={getAuthUser}
          /> }
          />
          <Route path='/register' element={<Register />} />
        
      </>
      )}
      </Routes>
    </div>
  )
}
