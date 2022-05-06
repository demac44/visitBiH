import React from 'react'
import Footer from '../../Components/General/Footer/Footer'
import Navbar from '../../Components/General/Navbar/Navbar'
import PlaceContainer from '../../Components/Place/Place/PlaceContainer'
import "./style.css"

const Place = () => {
  return (
    <>
        <Navbar/>
        <PlaceContainer/>
        <Footer/>
    </>
  )
}

export default Place