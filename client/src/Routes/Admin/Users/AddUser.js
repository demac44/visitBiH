import React, { useState } from 'react'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar'
import axios from 'axios'

const AddUser = () => {
  const [error, setError] = useState(false)


  const onSubmit = (e) => {
    e.preventDefault()

    setError(false)
    
      const username = e.target.username.value
      const email = e.target.email.value
      const password = e.target.password.value



    if(!username || !email || !password) {
      setError("Username and email are required!")
      return
    } 


    if(!verifyPassword(password)){
      setError("Password needs to be at least 8 characters long and contain at least one number!")    
      return
    }

    axios({
      method:"POST",
      url: "/api/users/create",
      data: {
        username, 
        password,
        email
      },
      withCredentials: true
    }).then(() => window.location.href = "/admin/users")

  }

  const verifyPassword = (password) => {
    let numberFound = false
    const nums = ["0","1","2","3","4","5","6","7","8","9"]
    if(password.length < 8) return false


    for(let i = 0; i < password.length; i++){
        if(nums.includes(password[i])) {
            numberFound = true
            break
        }
    }

    if(numberFound) return true
    return false

}



  return (
    <div className='admin_container'>
      <AdminNavbar/>
      <div className='admin_main'>
          <div className='admin_section_title'>
              <h2>
              ADD NEW USER
              </h2>
          </div>
          <form onSubmit={onSubmit} className="admin_add_form">
              {error && <p className='error-message'>{error}</p>}
              <input name='username' placeholder='Username'/>
              <input name='email' placeholder='Email'/>
              <input type="password" placeholder='Password' name='password'/>

              <button type='submit' className='admin_add_btn'>ADD</button> 
          </form>
      </div>
    </div>  
)
}

export default AddUser