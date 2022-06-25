import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const RegionAd = ({region}) => {
    const [ad, setAd] = useState(null)

    useEffect(() => {
        axios({
            method: "POST",
            url: "/api/ads/ad/region",
            data: { region: region}
        }).then(res => setAd(res.data))
    }, [])


    return (
        <>
            {ad?.image ?
            <a href={ad?.url} target="_blank" className='place-card'>
                <p className='ad-tag'>AD</p>
                <img src={ad?.image} className="card_image" alt=""/>
            </a>
            : 
            <></>}
        </>
    )
}

export default RegionAd