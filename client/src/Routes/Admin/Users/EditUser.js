import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AdminNavbar from '../../../Components/Admin/AdminNavbar/AdminNavbar'
import axios from 'axios'


const EditUser = () => {
    const [user, setUser] = useState({})
    const [error, setError] = useState(false)

    const params = useParams()

    useEffect(() => {
        axios({
            method:"POST",
            url: "/api/users/user",
            data:{
                id: params.id
            },
            withCredentials: true
        }).then(res => setUser(res.data))
    }, [params?.id])

    const onSubmit = (e) => {
        e.preventDefault()

        setError(false)

        const username = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value

        if(!username || !email) {
            setError("Username and email are required!")
            return
        } 

        let user
        let passwordChanged = false

        if(password){
            if(verifyPassword(password)){
                passwordChanged = true
                user = {
                    id: params.id,
                    username,
                    email,
                    password,
                    passwordChanged
                }
            } else setError("Password needs to be at least 8 characters long and contain at least one number!")
        } else {
            user = {
                id: params.id,
                username,
                email,
                passwordChanged
            }
        }

        axios({
            method:"POST",
            url: "/api/users/edit",
            data: {...user},
            withCredentials: true
        }).then(() => window.location.reload())
    }

    const deleteUser = () => {
        axios({
            method: "POST",
            url: "/api/users/delete",
            data:{
                id: params.id
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
                    Edit {user.username}
                    </h2>
                </div>
                <form onSubmit={onSubmit} className="admin_add_form">
                    {error && <p className='error-message'>{error}</p>}
                    <input name='username' placeholder='Change username' defaultValue={user.username}/>
                    <input name='email' placeholder='Change email' defaultValue={user.email}/>
                    <input type="password" placeholder='Change password' name='password'/>

                    <button type='submit' className='admin_add_btn'>SAVE</button> 
                </form>
                <button onClick={deleteUser} className='admin_add_btn'>DELETE</button>                                   

            </div>
        </div>
    )
}

export default EditUser