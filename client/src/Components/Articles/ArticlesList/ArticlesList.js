import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./style.css"
import ScreenLoader from "../../General/Loaders/ScreenLoader"
import ArticleCard from './ArticleCard/ArticleCard'
import { Link } from 'react-router-dom'
import SectionLoader from '../../General/Loaders/SectionLoader'


const ArticlesList = () => {
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
                <h1>FIND OUT MORE ABOUT BOSNIA AND HERZEGOVINA</h1>
                <div className='overlay'></div>
                <div className='articles-list'>
                    {articles.map(article => <ArticleCard article={article} key={article._id}/>)}
                    <Link to="/articles" className='articles-list-see-more'>
                        <h2>Read more</h2>
                    </Link>
                </div>
            </>}
            </div>
        </>
    )
}

export default ArticlesList