import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./style.css"
import ArticleCard from './ArticleCard/ArticleCard'
import { Link } from 'react-router-dom'
import SectionLoader from '../../General/Loaders/SectionLoader'
import ArticlesAd from '../../Ads/ArticlesAd'


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
                <h1>{lang==="english" ? "FIND OUT MORE ABOUT BOSNIA AND HERZEGOVINA" : "SAZNAJ VIŠE O BOSNI I HERCEGOVINI"}</h1>
                <div className='overlay'></div>
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