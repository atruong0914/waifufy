import React from 'react'
import { Link } from 'react-router-dom'

  const Nav = ({
    toggleAuthenticated,
    setUser,
  }) => {
    const logOut = (e) => {
      toggleAuthenticated(false)
      setUser(null)
      localStorage.clear()
    }
    
    return (
      <div>
        <Link to='/'> Home </Link>
        <Link to='/playlists' > Playlists </Link>
        <Link to='/artists' > Artists </Link>
        <Link to='/songs' > Songs </Link>
        <Link to='/about' > About </Link>
        <Link to='/' onClick={logOut}> Log out </Link>

      </div>
    )
  }

export default Nav