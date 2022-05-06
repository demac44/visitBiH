import React, { useState } from 'react'
import "./style.css"

import axios from "axios"

const Login = () => {
    const [error, setError] = useState(null)

    const onSubmit = (e) => {
        e.preventDefault()

        setError(null)

        const username = e.target.username.value
        const password = e.target.password.value

        try{
            axios({
                method: 'POST',
                url: '/api/users/login',
                data:{
                    username: username,
                    password: password
            },
            withCredentials:true
        })
        .then(res => {
            if(res.data.auth && res.data.token) window.location.href = "/admin/dashboard"
            else setError(res.data.message)
        })
    } catch (err){
        console.log(err);
    }
    }



    return (
        <div className='login-container'>
            <form onSubmit={onSubmit} className="login-form">
                {error && <p className='login-error-msg'>{error}</p>}
                <input type="text" placeholder='Username' name='username' id='username'/>
                <input type="password" placeholder='Password' name='password' id='password'/>
                <button type='submit'>LOGIN</button>
            </form>
        </div>
    )
}

export default Login