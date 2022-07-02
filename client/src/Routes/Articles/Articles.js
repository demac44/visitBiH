import React, { useCallback, useContext, useEffect, useState } from 'react'
import Footer from '../../Components/General/Footer/Footer'
import Navbar from '../../Components/General/Navbar/Navbar'
import "./style.css"
import axios from 'axios'
import AllArticles from '../../Components/Articles/AllArticles/AllArticles'
import ScreenLoader from '../../Components/General/Loaders/ScreenLoader'

import { LangContext } from '../../index'

const Articles = () => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [url, setUrl] = useState("/api/articles/latest")
    const [refresh, setRefresh] = useState(false)

    const lang = useContext(LangContext)

    useEffect(() => {
        setLoading(true)
        axios.get(url)
        .then(res => setArticles(res.data))
        .then(setLoading(false))
    }, [url, refresh])


    const setUrlCallback = useCallback(value => {
        setUrl(value)
        setRefresh(!refresh)
    }, [setUrl, setRefresh])

    const setArticlesCallback = useCallback(value => {
        setArticles(value)
    }, [setArticles])

    return (
        <>
            <Navbar/>
            {loading ? <ScreenLoader/> : <AllArticles articles={articles} lang={lang} setUrlCallback={setUrlCallback} setArticlesCallback={setArticlesCallback}/>}
            <Footer/>
        </>
    )
}

export default Articles