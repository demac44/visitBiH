import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar'
import UserItem from '../../../Components/Admin/ItemsList/Item/UserItem'

const AllUsers = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get("/api/users/all", {
            withCredentials: true
        })
        .then(res => setUsers(res.data))
    }, [])



    return (
        <div className='admin_container'>
            <AdminNavbar/>
            <div className='items-grid'>
            <Link to="/admin/users/add" className='add-place-link'><i className='fas fa-plus'></i><p>NEW USER</p></Link>
            {users.map(user => <UserItem item={user} key={user._id}/>)}
            </div>

        </div>
    )
}

export default AllUsers