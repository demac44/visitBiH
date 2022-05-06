import React from 'react'
import "./style.css"

const PlaceTitle = ({name, city}) => {
  return (
    <div className='place-title'>
        <h2>{name}</h2>
        <h3>{city}</h3>
    </div>
  )
}

export default PlaceTitle