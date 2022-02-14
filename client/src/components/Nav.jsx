import React from 'react'
import { Link } from 'react-router-dom'
import MusicNoteIcon from '@mui/icons-material/MusicNote';

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
      <>
      <div className='header'>
      <img src='/waifu.png' className='waifu'/>
      <h1 className='waifufy'>✿✿✿ waifufy ✿✿✿</h1>
      </div>
      <div className='nav'>
        <MusicNoteIcon className='music-icon'/>
        <Link to='/' className='link'> Home </Link>
        <Link to='/playlists' className='link'> Playlists </Link>
        <Link to='/artists' className='link'> Artists </Link>
        <Link to='/songs' className='link'> Songs </Link>
        {/* <Link to='/about' className='link'> About </Link> */}
      <div className='log-out' >
        <Link to='/' onClick={logOut} className='link'> Log out </Link>
      </div>
      </div>
      </>
    )
  }

export default Nav