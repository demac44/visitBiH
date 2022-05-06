import React from 'react'
import "./style.css"
import logo from "../../../Assets/Images/logo-visitbih.png"
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} className="logo"/>
    </Link>
  )
}

export default Logo