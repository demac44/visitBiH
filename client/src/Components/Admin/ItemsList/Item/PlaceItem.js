import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"


const PlaceItem = ({item}) => {
  return (
    <div className='item'>
        <p>{item.name.english}</p>
        <Link to={"/admin/places/edit/"+item._id}><i className='fas fa-edit'></i></Link>
    </div>
  )
}

export default PlaceItem