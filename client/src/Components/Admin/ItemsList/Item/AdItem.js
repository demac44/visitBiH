import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"

const AdItem = ({item}) => {
  return (
    <div className='item'>
        {item?.type === "region-ad" ? <p>{item.region}</p> : <p>Article Ad</p>}
        <Link to={"/admin/ads/edit/"+item._id}><i className='fas fa-edit'></i></Link>
    </div>
  )
}

export default AdItem