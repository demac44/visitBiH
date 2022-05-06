import React from 'react'
import Footer from '../../Components/General/Footer/Footer'
import Navbar from '../../Components/General/Navbar/Navbar'
import PlacesList from '../../Components/Places/PlacesList/PlacesList'
import "./style.css"


const Places = () => {
  return (
    <>
        <Navbar/>
        <PlacesList/>
        <Footer/>
    </>
  )
}

export default Places