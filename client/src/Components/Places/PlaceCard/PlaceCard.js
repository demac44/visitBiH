import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"

const PlaceCard = ({place, lang}) => {

  return (
    <Link to={"/explore/"+place.region+"/"+place._id+"/"+place.name.english} className='place-card'>
        <div className='place-card-overlay'></div>
        <img src={place.card_img} className="card_image" alt=""/>
        <h3>{place.name[lang]}</h3>
    </Link>
  )
}

export default PlaceCard