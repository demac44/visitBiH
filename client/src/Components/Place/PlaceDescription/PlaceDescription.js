import React from 'react'
import "./style.css"

const PlaceDescription = ({description}) => {
  return (
    <div className='place-description'>
        <p>{description}</p>
    </div>
  )
}

export default PlaceDescription