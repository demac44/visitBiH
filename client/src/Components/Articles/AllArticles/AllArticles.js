import React from 'react'
import ArticleCard from '../ArticlesList/ArticleCard/ArticleCard'
import "./style.css"

const AllArticles = ({articles}) => {
  return (
    <div className='all-articles-container'>
      <div className='all-articles'>
        {articles.map(article => <ArticleCard article={article} key={article._id}/>)}
      </div>
    </div> 
  )
}

export default AllArticles