import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import "./admin.css"

import AllPlaces from './Places/AllPlaces'
import EditPlace from './Places/EditPlace'
import AddPlace from './Places/AddPlace'

import AllArticles from './Articles/AllArticles'
import EditArticle from './Articles/EditArticle'
import AddArticle from './Articles/AddArticle'
import Login from './Login/Login'
import axios from 'axios'
import AllUsers from './Users/AllUsers'
import AddUser from './Users/AddUser'
import EditUser from './Users/EditUser'


const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false)


  function getCookie(name) {
    let a = `; ${document.cookie}`.match(`;\\s*${name}=([^;]+)`);
    return a ? a[1] : '';
}

  useEffect(() => {
    const token = getCookie("x-auth-token")
    axios({
      method: "POST",
      url: "/api/auth",
      data:{
        token
      },
      withCredentials: true
    }).then(res => {
        if(res.data.auth) setLoggedIn(true)
        else setLoggedIn(false)
    })
  }, [])



  return (
      <Routes>
          <Route path='/login' element={<Login/>}/>
          {loggedIn && <Route path='/admin'>
            <Route path='dashboard' element={<Dashboard/>}/>

            <Route path="places" element={<AllPlaces/>}/>
            <Route path="places/edit/:id" element={<EditPlace/>}/>
            <Route path="places/add" element={<AddPlace/>}/>

            <Route path="articles" element={<AllArticles/>}/>
            <Route path="articles/edit/:id" element={<EditArticle/>}/>
            <Route path="articles/add" element={<AddArticle/>}/>

            <Route path="users" element={<AllUsers/>}/>
            <Route path="users/add" element={<AddUser/>}/>
            <Route path="users/edit/:id" element={<EditUser/>}/>            

          </Route>}
      </Routes>
  )
}

export default Admin