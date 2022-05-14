import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from "react-router-dom"

import Logo from '../Logo/Logo'
import "./style.css"

import { LangContext } from "../../../index"

const Navbar = () => {

  function getCookie(name) {
    let a = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`);
    return a ? a[1] : '';
  }

  const lang = useContext(LangContext)


  const changeLanguage = (lang) => {
    axios({
      method: "POST",
      url: "/api/lang",
      data:{
        lang: lang
      },
      withCredentials: true
    }).then(() => window.location.reload())
  }



  return (
    <div className='navbar'>
      <Logo/>
      <span className='navbar-links'>
        {lang === "english" ? 
        <>
          <Link to="/">HOME</Link>
          <Link to="/explore">EXPLORE</Link>
          <Link to="/about">ABOUT</Link>
        </>
        :
        <>
          <Link to="/">POČETNA</Link>
          <Link to="/explore">ISTRAŽI</Link>
          <Link to="/about">INFO</Link>
        </>

      }
        <select className='choose-language' onChange={(e) => changeLanguage(e.target.value)} defaultValue={getCookie("lang")}>
          <option value="english">English</option>
          <option value="bosnian">Bosanski</option>
        </select>
      </span>
    </div>
  )
}

export default Navbar