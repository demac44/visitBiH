import React, { useEffect, useState } from 'react'
import Footer from '../../Components/General/Footer/Footer'
import Navbar from '../../Components/General/Navbar/Navbar'
import "./style.css"
import axios from 'axios'
import AllArticles from '../../Components/Articles/AllArticles/AllArticles'
import ScreenLoader from '../../Components/General/Loaders/ScreenLoader'

const Articles = () => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true)
        axios.get("/api/articles/all")
        .then(res => setArticles(res.data))
        .then(setLoading(false))
    }, [])


    return (
        <>
            <Navbar/>
            {loading ? <ScreenLoader/> : <AllArticles articles={articles}/>}
            <Footer/>
        </>
    )
}

export default Articles