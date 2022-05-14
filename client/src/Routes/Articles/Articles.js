import React, { useContext, useEffect, useState } from 'react'
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


    const lang = useContext(LangContext)

    useEffect(() => {
        setLoading(true)
        axios.get("/api/articles/all")
        .then(res => setArticles(res.data))
        .then(setLoading(false))
    }, [])


    return (
        <>
            <Navbar/>
            {loading ? <ScreenLoader/> : <AllArticles articles={articles} lang={lang}/>}
            <Footer/>
        </>
    )
}

export default Articles