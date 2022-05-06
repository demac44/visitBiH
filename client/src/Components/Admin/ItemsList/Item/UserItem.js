import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"


const UserItem = ({item}) => {
  return (
    <div className='item'>
        <p>{item.username}</p>
        <Link to={"/admin/users/edit/"+item._id}><i className='fas fa-edit'></i></Link>
    </div>
  )
}

export default UserItem