import React from 'react'
import AboutContainer from '../../Components/About/AboutContainer/AboutContainer'
import Navbar from "../../Components/General/Navbar/Navbar"
import Footer from "../../Components/General/Footer/Footer"
import "./style.css"

const About = () => {
  return (
    <>
        <Navbar/>
        <AboutContainer/>
        <Footer/>
    </>
  )
}

export default About