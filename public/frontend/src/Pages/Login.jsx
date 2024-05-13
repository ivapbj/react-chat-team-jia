import React from 'react'
 import  { useState } from 'react';
//     import { useNavigate } from 'react-router-dom';


export default function Login(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:8080/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const data = await response.json();
        if(response.ok){//do we impelent admin perms here??
            setEmail('')
            setPassword('')
            localStorage.setItem('token', data.token)
            alert('login successful')
            window.location.href = '/'
        }
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
return(//add in our navigation bar for every  document
<div>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
        <label>email:</label>
        <input type="text" value={email} onChange={(e)=> setEmail (e.target.value)} required/>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e)=> setPassword (e.target.value)} required/>
        <button type="submit">Login</button>
    </form>
</div>

)
    
}