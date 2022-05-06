import React from 'react'
import ArticleCard from '../ArticlesList/ArticleCard/ArticleCard'
import "./style.css"

const AllArticles = ({articles}) => {
  return (
    <div className='all-articles-container'>
        {articles.map(article => <ArticleCard article={article} key={article._id}/>)}
    </div> 
  )
}

export default AllArticles