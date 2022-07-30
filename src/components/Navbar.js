import React from 'react'
import { Link } from 'react-router-dom'

// styles and images
import './Navbar.css'
import Temple from '../assets/temple.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt="logo" />
          <span>ProjectManagement</span>
        </li>
        <li>
          <Link exact to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Signup</Link>
        </li>
        <li>
          <button className='btn'>Logout</button>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
