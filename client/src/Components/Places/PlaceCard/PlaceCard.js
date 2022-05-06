import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"

const PlaceCard = ({place}) => {
  return (
    <Link to={"/explore/"+place.region+"/"+place.name} className='place-card'>
        <div className='place-card-overlay'></div>
        <img src={place.card_img} className="card_image"/>
        <h3>{place.name}</h3>
    </Link>
  )
}

export default PlaceCard