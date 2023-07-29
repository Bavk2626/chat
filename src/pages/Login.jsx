import React from 'react'
import { useState } from 'react';
import { useNavigate ,Link } from 'react-router-dom'
import { auth } from '../firebase';
import {  signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const nav = useNavigate();

  const [err,setErr] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("anand");
    //console.log(e.target[0].value);
    const email = e.target[0].value;
    const password = e.target[1].value;
try{
 await signInWithEmailAndPassword(auth, email, password)
 nav("/chat");
}
catch(err){
setErr(true);
}
  }

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Am chat</span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='Email'/>
                <input type='password' placeholder='password'/>
                <button >Log in</button>
            </form> 
            {err ? <span className='err'>Invalid Username or Password</span>:<></>}
            <p>You do have an account ? <Link to='/chat/register'>Register</Link></p>
        </div>
    </div>
  );
  }

export default Login