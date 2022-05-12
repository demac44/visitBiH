import React from 'react'
import "./style.css"
import { Link } from "react-router-dom"

const Error404 = () => {
  return (
    <div className='error-404'>
      <h1>Page not found</h1>
      <Link to="/">Return to main page</Link>
    </div>
  )
}

export default Error404