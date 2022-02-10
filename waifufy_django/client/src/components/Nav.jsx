import React from 'react'
import { Link } from 'react-router-dom'

  const Nav = ({
    authenticated,
    toggleAuthenticated,
    setUser,
    authUser
  }) => {
    const logOut = (e) => {
      toggleAuthenticated(false)
      setUser(null)
      localStorage.clear()
    }
    return (
      <div>
        <Link to='/' onClick={logOut}>log out</Link>
      </div>
    )
  }

export default Nav