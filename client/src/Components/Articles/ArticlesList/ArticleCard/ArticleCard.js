import React from 'react'
import "./style.css"
import { Link } from "react-router-dom"

const ArticleCard = ({article, lang}) => {
  return (
    <Link to={"/article/"+article._id+"/"+article.title[lang]} className='article-card'>
        <div className='article-card-img-box'>
          <img src={article.card_image} className='article-card-image' alt=""/>
        </div>
        <h4>{article.title[lang]}</h4>
    </Link>
  )
}

export default ArticleCard