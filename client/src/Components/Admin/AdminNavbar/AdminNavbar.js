import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./admin_navbar.css"
import axios from "axios"

const AdminNavbar = () => {
  const [nav, setNav] = useState(false)


  const logout = () => {
    axios({
      method: "POST",
      url: "/api/users/logout",
      withCredentials:true
    }).then(() => window.location.href = "/login")
  }


  return (
    <>
    {nav && <div className='admin_navbar'>
          <ul>
            <Link to="/admin/dashboard"><li>Dashboard</li></Link>
            <Link to="/admin/places"><li>Places</li></Link>
            <Link to="/admin/articles"><li>Articles</li></Link>
            <Link to="/admin/users"><li>Users</li></Link>
            <li onClick={logout} className='log-out-btn'><p>LOG OUT</p></li>
          </ul>
        </div>}

      <div onClick={() => setNav(!nav)} className="admin_closed_navbar">
        <span>
          <i className='fas fa-bars'></i>
        </span>
      </div>
    </>
  )
}

export default AdminNavbar