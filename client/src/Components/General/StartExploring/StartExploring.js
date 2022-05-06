import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const StartExploring = () => {
  return (
    <div className='start-exploring-box'>
        <span className='start-exploring-text'>
            <h3>START EXPLORING BOSNIA AND HERZEGOVINA</h3>
        </span> 
        <span className='start-exploring-btn'>
            <Link to="/explore">EXPLORE</Link>
        </span>
    </div>
  )
}

export default StartExploring