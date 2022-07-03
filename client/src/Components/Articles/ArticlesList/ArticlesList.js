import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./style.css"
import ArticleCard from './ArticleCard/ArticleCard'
import { Link } from 'react-router-dom'
import SectionLoader from '../../General/Loaders/SectionLoader'
import ArticlesAd from '../../Ads/ArticlesAd'
import DownloadTheAppStripe from '../../Download the app/DownloadTheAppStripe'


const ArticlesList = ({lang}) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        axios.get("/api/articles")
        .then(res => setArticles(res.data))
        .then(() => setLoading(false))
    }, [])


    return (
        <>
            <div className='articles-list-container'>
            {loading ? <SectionLoader/> :
            <>
                <h1>{lang==="english" ? "Read more about Bosnia and Herzegovina" : "Čitaj više o Bosni i Hercegovini"}</h1>
                <div className='overlay' style={{backgroundColor: "rgba(0,0,0,0.9)"}}></div>
                <div className='articles-list'>
                    <ArticlesAd/>
                    {articles.map(article => <ArticleCard article={article} lang={lang} key={article._id}/>)}
                    <Link to="/articles" className='articles-list-see-more'>
                        <h2>{lang==="english" ? "Read more" : "Čitaj više"}</h2>
                    </Link>
                </div>
            </>}
            </div>
        </>
    )
}

export default ArticlesList