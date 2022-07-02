import axios from 'axios'
import React, { useState } from 'react'
import ArticlesAd from '../../Ads/ArticlesAd'
import DownloadTheAppStripe from '../../Download the app/DownloadTheAppStripe'
import ScreenLoader from '../../General/Loaders/ScreenLoader'
import ArticleCard from '../ArticlesList/ArticleCard/ArticleCard'
import "./style.css"

const AllArticles = ({articles, lang, setUrlCallback, setArticlesCallback}) => {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")


  const search = (e) => {
    e.preventDefault()
    setLoading(true)
    axios({
      method: "POST",
      url: "/api/articles/search",
      data: {
        query: query
      },
      withCredentials: true
    }).then(res => setArticlesCallback(res.data)).then(() => setLoading(false))
  }

  const clearSearch = () => {
    setQuery("")
    setUrlCallback("/api/articles/latest")
  }

  return (
    <div className='all-articles-container'>
      <div className='all-articles-header'>

      {lang === "english" ?
        <h1>Read more about Bosnia and Herzegovina</h1>
        : 
        <h1>Čitaj više o Bosni i Hercegovini</h1>}

        <span className='articles-search-box'>
          <form onSubmit={search}>
            <input name="search_query" id='search_query' value={query} onChange={(e) => setQuery(e.target.value)} placeholder={lang === "english" ? "Search" : "Pretraga"}/>
            {query && <span className='clear-search' onClick={clearSearch}><i className='fas fa-times'/></span>}
            <button type='submit'><i className='fas fa-search'/></button>
          </form>
          <select onChange={(e) => setUrlCallback("/api/articles/"+e.target.value)}>
            <option value="latest">{lang === "english" ? "Latest" : "Najnovije"}</option>
            <option value="popular">{lang === "english" ? "Most read" : "Najčitanije"}</option>
          </select>
        </span>

      </div>
      <div className='all-articles-overlay'></div>
        <DownloadTheAppStripe bckgColor="black" color="white"/>
      {loading ? <ScreenLoader/> :
      <div className='all-articles'>
        <ArticlesAd/>
        {articles.map(article => <ArticleCard article={article} key={article._id} lang={lang}/>)}
      </div>}
    </div> 
  )
}

export default AllArticles