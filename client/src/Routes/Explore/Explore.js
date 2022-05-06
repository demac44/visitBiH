import React from 'react'
import SVGMap from '../../Components/Explore/SVGMap/SVGMap'
import Footer from '../../Components/General/Footer/Footer'
import Navbar from '../../Components/General/Navbar/Navbar'
import "./style.css"

const Explore = () => {
  return (
    <>
        <Navbar/>
        <SVGMap/>
        <Footer/>
    </>
  )
}

export default Explore