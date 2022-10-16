import React from 'react'
import { Link } from 'react-router-dom' // might need work
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// styles and images
import './Navbar.css'
import Temple from '../assets/temple.svg'

const Navbar = () => {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt="logo" />
          <span>ProjectManagement</span>
        </li>

        {!user && (
          <>
            <li>
              <Link exact to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
          </>
        )}

        {user && (
          <li>
            {!isPending && <button className='btn' onClick={logout}>Logout</button>}
            {isPending && <button className='btn' disabled>Logging out...</button>}
          </li>
        )}
      </ul>
    </div>
  )
}

export default Navbar