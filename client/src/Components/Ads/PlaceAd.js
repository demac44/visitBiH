import React from 'react'
import "./style.css"

const PlaceAd = ({ad}) => {
  return (
    <>  
        {ad?.image && ad?.showAd ?
            <a href={ad?.url} target="_blank" className='place-ad'>
                <p className='ad-tag'>AD</p>
                <img src={ad?.image} alt=""/>
            </a>
            :
            <></>}
    </>
  )
}

export default PlaceAd