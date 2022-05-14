import React from 'react'
import ArticleCard from '../ArticlesList/ArticleCard/ArticleCard'
import "./style.css"

const AllArticles = ({articles, lang}) => {
  return (
    <div className='all-articles-container'>
      {lang === "english" ?
      <h1 className='all-articles-title'>READ MORE ABOUT BOSNIA AND HERZEGOVINA</h1>
      : 
      <h1 className='all-articles-title'>ČITAJ VIŠE O BOSNI I HERCEGOVINI</h1>}
      <div className='all-articles-overlay'></div>
      <div className='all-articles'>
        {articles.map(article => <ArticleCard article={article} key={article._id} lang={lang}/>)}
      </div>
    </div> 
  )
}

export default AllArticles