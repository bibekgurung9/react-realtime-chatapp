import React from 'react'
import { LogOut } from 'react-feather'
import { useAuth } from '../utils/AuthContext'

const Header = () => {
  const { user, handleUserLogout } = useAuth()
  return (
    <div id='header--wrapper'>
      {user ? (
        <><h2>Welcome <span className='header--user'>{ user.name }</span>! to our chatroom</h2>
        <LogOut className='header--link' onClick={handleUserLogout}/>
        </>
      ): (
        <button>Login</button>
      )}
    </div>
  )
}

export default Header