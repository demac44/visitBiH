import React, { useEffect, useState } from 'react'
import "./style.css"
import axios from "axios"
import { useParams } from 'react-router-dom'
import ImageSlider from '../ImageSlider/ImageSlider'
import ScreenLoader from '../../General/Loaders/ScreenLoader'
import PlaceDescription from '../PlaceDescription/PlaceDescription'
import GoogleMapsIframe from '../GoogleMapsIframe/GoogleMapsIframe'
import PlaceTitle from '../PlaceTitle/PlaceTitle'


const PlaceContainer = () => {
  const [place, setPlace] = useState({})
  const [loading, setLoading] = useState(true)


  const params = useParams()

  useEffect(() => {
    setLoading(true)
    axios({
      method: "POST",
      url: "/api/places/place",
      data:{
        name: params.place,
        region: params.region
      },
      withCredentials: true
    }).then(res => {setPlace(res.data[0]); setLoading(false)})
  }, [])


  return (
    <div className='place-container'>
      <div className='places-overlay'></div>
      {loading ? <ScreenLoader/> :
      <>
        <PlaceTitle name={place.name} city={place.city}/>
        <ImageSlider images={place.images}/>    
        <PlaceDescription description={place.description}/> 
        <GoogleMapsIframe iframe={place.location.google_maps_iframe} link={place.location.google_maps_link}/>
      </>
      }
    </div>
  )
}

export default PlaceContainer