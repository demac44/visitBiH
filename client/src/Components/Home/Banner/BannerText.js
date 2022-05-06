import React from 'react'

const BannerText = ({text, welcome}) => {
  return (
    <div className='banner-text'>
        <h2>{welcome}</h2>
        <h1>BOSNIA AND HERZEGOVINA</h1>
        <h3>{text}</h3>    
    </div>
  )
}

export default BannerText