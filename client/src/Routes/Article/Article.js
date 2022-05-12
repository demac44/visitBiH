import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/General/Navbar/Navbar'
import "./style.css"
import axios from "axios"
import { useParams } from 'react-router-dom'
import ArticleBanner from '../../Components/Articles/Article/Banner/ArticleBanner'
import ArticleIntroText from '../../Components/Articles/Article/IntroText/ArticleIntroText'
import ArticleSections from '../../Components/Articles/Article/Sections/ArticleSections'
import Footer from '../../Components/General/Footer/Footer'
import ScreenLoader from '../../Components/General/Loaders/ScreenLoader'
import ArticlesList from '../../Components/Articles/ArticlesList/ArticlesList'
import StartExploring from "../../Components/General/StartExploring/StartExploring"
import Error404 from '../404/Error404'

const Article = () => {
    const [article, setArticle] = useState(null)
    const [loading, setLoading] = useState(true)

    const params = useParams()

    useEffect(() => {
        setLoading(true)
        axios({
            method: "POST",
            url: "/api/articles/article",
            data:{
                title: params.title
            },
            withCredentials: true
        })
        .then(res => {setArticle(res.data)})
        .then(() => setLoading(false))
    }, [params.title])


    if (!loading && !article) return <Error404/>

    return (
        <>
            {loading ? <ScreenLoader/> : 
            <>
                <Navbar/>
                <ArticleBanner title={article.title} banner={article.banner}/>
                <ArticleIntroText title={article.intro_title} text={article.intro_text}/>
                <ArticleSections sections={article.sections}/>
                <ArticlesList/>
                <StartExploring/>
                <Footer/>
            </>}
        </>
        )
}

export default Article