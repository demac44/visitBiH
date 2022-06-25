import axios from 'axios'
import React from 'react'
import ArticlesAd from '../../Ads/ArticlesAd'
import ArticleCard from '../ArticlesList/ArticleCard/ArticleCard'
import "./style.css"

const AllArticles = ({articles, lang, setUrlCallback, setArticlesCallback}) => {



  const search = (e) => {
    e.preventDefault()
    axios({
      method: "POST",
      url: "/api/articles/search",
      data: {
        query: e.target.search_query.value
      },
      withCredentials: true
    }).then(res => setArticlesCallback(res.data))
  }


  return (
    <div className='all-articles-container'>
      <div className='all-articles-header'>

      {lang === "english" ?
        <h1>READ MORE ABOUT BOSNIA AND HERZEGOVINA</h1>
        : 
        <h1>ČITAJ VIŠE O BOSNI I HERCEGOVINI</h1>}

        <span className='articles-search-box'>
          <form onSubmit={search}>
            <input name="search_query" id='search_query' placeholder={lang === "english" ? "Search" : "Pretraga"}/>
            <button type='submit'><i className='fas fa-search'/></button>
          </form>
          <select onChange={(e) => setUrlCallback("/api/articles/"+e.target.value)}>
            <option value="latest">{lang === "english" ? "Latest" : "Najnovije"}</option>
            <option value="popular">{lang === "english" ? "Most read" : "Najčitanije"}</option>
          </select>
        </span>

      </div>
      <div className='all-articles-overlay'></div>
      <div className='all-articles'>
        <ArticlesAd/>
        {articles.map(article => <ArticleCard article={article} key={article._id} lang={lang}/>)}
      </div>
    </div> 
  )
}

export default AllArticles