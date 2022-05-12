import React from 'react'
import "./style.css"
import { Link } from "react-router-dom"

const ArticleCard = ({article}) => {
  return (
    <Link to={"/article/"+article.title} className='article-card'>
        <div className='article-card-img-box'>
          <img src={article.card_image} className='article-card-image' alt=""/>
        </div>
        <h4>{article.title}</h4>
    </Link>
  )
}

export default ArticleCard