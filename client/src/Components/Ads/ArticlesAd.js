import React, { useEffect, useState } from 'react'
import axios from "axios"


const ArticlesAd = () => {
    const [ad, setAd] = useState(null)

    useEffect(() => {
        axios({
            method: "POST",
            url: "/api/ads/ad/article"
        }).then(res => setAd(res.data))
    }, [])

    return (
        <>  
            {ad?.image ?
            <a href={ad?.url} target="_blank" className='article-card-ad'>
                <p className='ad-tag'>AD</p>
                <img src={ad?.image} className='article-card-image' alt=""/>
            </a>
            : <></>}
        </>
    )
}

export default ArticlesAd