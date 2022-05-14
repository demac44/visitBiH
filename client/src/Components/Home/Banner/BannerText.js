import React from 'react'


const BannerText = ({text, welcome, lang}) => {

  return (
    <div className='banner-text'>
        <h2>{welcome}</h2>
        <h1>{lang === "english" ? "BOSNIA AND HERZEGOVINA" : "BOSNA I HERCEGOVINA"}</h1>
        <h3>{text}</h3>    
    </div>
  )
}

export default BannerText