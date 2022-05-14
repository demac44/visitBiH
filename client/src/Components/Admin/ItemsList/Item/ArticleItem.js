import React from 'react'
import { Link } from 'react-router-dom'
import "./style.css"

const ArticleItem = ({item}) => {
  return (
    <div className='item'>
        <p>{item.title.english}</p>
        <Link to={"/admin/articles/edit/"+item._id}><i className='fas fa-edit'></i></Link>
    </div>
  )
}

export default ArticleItem