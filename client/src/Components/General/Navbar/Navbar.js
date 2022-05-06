import React from 'react'
import { Link } from "react-router-dom"

import Logo from '../Logo/Logo'
import "./style.css"

const Navbar = () => {
  return (
    <div className='navbar'>
      <Logo/>
      <span className='navbar-links'>
        <Link to="/">HOME</Link>
        <Link to="/explore">EXPLORE</Link>
        <Link to="/about">ABOUT</Link>
      </span>
    </div>
  )
}

export default Navbar