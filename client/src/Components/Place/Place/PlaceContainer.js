import React, { useContext, useEffect, useState } from 'react'
import "./style.css"
import axios from "axios"
import { useParams } from 'react-router-dom'
import ImageSlider from '../ImageSlider/ImageSlider'
import ScreenLoader from '../../General/Loaders/ScreenLoader'
import PlaceDescription from '../PlaceDescription/PlaceDescription'
import GoogleMapsIframe from '../GoogleMapsIframe/GoogleMapsIframe'
import PlaceTitle from '../PlaceTitle/PlaceTitle'
import Error404 from "../../../Routes/404/Error404"

import {LangContext} from "../../../index"
import PlaceAd from '../../Ads/PlaceAd'
import DownloadTheAppStripe from '../../Download the app/DownloadTheAppStripe'

const PlaceContainer = () => {
  const [place, setPlace] = useState({})
  const [loading, setLoading] = useState(true)

  const lang = useContext(LangContext)

  const params = useParams()

  useEffect(() => {
    setLoading(true)
    axios({
      method: "POST",
      url: "/api/places/place",
      data:{
        id: params.id
      },
      withCredentials: true
    }).then(res => {setPlace(res.data[0]); setLoading(false)})
  }, [params?.id])



  if(!loading && !place) return <Error404/>

  return (
    <div className='place-container'>
      <div className='places-overlay'>
      </div>
      {loading ? <ScreenLoader/> :
      <>
        <div className='place-gp-link'>
        <DownloadTheAppStripe bckgColor="black" color="white"/>
        </div>
        <PlaceAd ad={place?.ad}/>
        <PlaceTitle name={place.name[lang]} city={place.city}/>
        <ImageSlider images={place.images}/>    
        <PlaceDescription description={place.description[lang]}/> 
        <GoogleMapsIframe iframe={place.location.google_maps_iframe} link={place.location.google_maps_link}/>
      </>
      }
    </div>
  )
}

export default PlaceContainer