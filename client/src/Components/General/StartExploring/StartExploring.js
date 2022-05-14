import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const StartExploring = ({lang}) => {
  return (
    <div className='start-exploring-box'>
        <span className='start-exploring-text'>
            <h3>{lang==="english" ? "START EXPLORING BOSNIA AND HERZEGOVINA" : "ISTRAŽI BOSNU I HERCEGOVINU"}</h3>
        </span> 
        <span className='start-exploring-btn'>
            <Link to="/explore">{lang==="english" ? "EXPLORE" : "ZAPOČNI"}</Link>
        </span>
    </div>
  )
}

export default StartExploring