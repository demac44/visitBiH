import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar'
import AdItem from '../../../Components/Admin/ItemsList/Item/AdItem'
import ScreenLoader from '../../../Components/General/Loaders/ScreenLoader'

const AllAds = () => {
    const [ads, setAds] = useState([])
    const [filteredAds, setFilteredAds] = useState(ads)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        setLoading(true)
        axios({
          method: "GET",
          url: "/api/ads"
        })
        .then(res => {setAds(res.data);setFilteredAds(res.data)})
        .then(() => setLoading(false))
    }, [])

    const search = (query) => {
        if(query.length===0){ setFilteredAds(ads);return}
        const filtered = ads.filter(ad=> {
          return ad.title.toLowerCase().includes(query)
        })
        setFilteredAds(filtered)
      }
    

    return (
        <div className='admin_container'>
        <AdminNavbar/>
        {loading ? <ScreenLoader/> 
            : 
            <>
            <div className='items-grid'>
                <Link to="/admin/ads/add" className='add-place-link'><i className='fas fa-plus'></i><p>NEW</p></Link>
                <input className='search-items' onChange={(e) => search(e.target.value)} placeholder='Search'/>
                {filteredAds.map(ad => <AdItem item={ad} key={ad?._id}/>)}
            </div>
            </>}
    </div>
    )
}

export default AllAds