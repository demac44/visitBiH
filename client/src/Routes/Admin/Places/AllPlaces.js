import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar'
import axios from 'axios'
import PlaceItem from '../../../Components/Admin/ItemsList/Item/PlaceItem'
import "./style.css"
import ScreenLoader from "../../../Components/General/Loaders/ScreenLoader"
import { Link } from 'react-router-dom'


const AllPlaces = () => {
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState(places)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axios.get("/api/places")
    .then(res => {setPlaces(res.data);setFilteredPlaces(res.data)})
    .then(() => setLoading(false))
  }, [])


  const search = (query) => {
    if(query.length===0){ setFilteredPlaces(places);return}
    const filtered = places.filter(place => {
      return place.name.toLowerCase().includes(query) || place.city.toLowerCase().includes(query)
    })
    setFilteredPlaces(filtered)
  }

  

  return (
    <div className='admin_container'>
      <AdminNavbar/>
     {loading ? <ScreenLoader/> 
      : 
      <>
        <div className='items-grid'>
          <Link to="/admin/places/add" className='add-place-link'><i className='fas fa-plus'></i><p>NEW</p></Link>
          <input className='search-items' onChange={(e) => search(e.target.value)} placeholder='Search'/>
          {filteredPlaces.map(place => <PlaceItem item={place} key={place._id}/>)}
        </div>
      </>}
    </div>
  )
}

export default AllPlaces