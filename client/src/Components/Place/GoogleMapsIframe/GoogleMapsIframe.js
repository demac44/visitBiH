import React from 'react'
import "./style.css"


const GoogleMapsIframe = ({iframe, link}) => {
  return (
    <div className='google-maps-iframe'>
        <iframe src={iframe} title="google_maps_iframe"></iframe>
        <a href={link} className='google-maps-link' rel="noreferrer" target="_blank">
            <p>SEE ON GOOGLE MAPS</p>
        </a>
    </div>
  )
}

export default GoogleMapsIframe