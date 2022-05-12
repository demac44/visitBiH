import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./style.css"

import axios from "axios"
import PlaceCard from '../PlaceCard/PlaceCard'
import ScreenLoader from '../../General/Loaders/ScreenLoader'

const PlacesList = () => {
    const [places, setPlaces] = useState([])
    const [loading, setLoading] = useState(true)

    const params = useParams()

    useEffect(() => {
        setLoading(true)
        axios({
            method: "POST",
            url: "/api/places/region",
            data:{
                region: params.region
            },
            withCredentials: true
        })
        .then(res => setPlaces(res.data))
        .then(() => setLoading(false))
        .catch(err => console.log(err))
    }, [params.region])


    return (
        <div className='places-list-container'>
            <div className='places-overlay'></div>
            <div className='places-list'>
                {loading ? <ScreenLoader/> 
                : places.map(place => <PlaceCard place={place} key={place._id}/>)}
            </div>
        </div>
    )
}

export default PlacesList