import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


const Navbar = () => {
  const nav = useNavigate();
  const currentUser = useContext(AuthContext).currentUser;
  return (
    <div className='navbar'>
        <span className='logo'>Am Chat</span>
        <div className='user'>
        <img src={currentUser.photoURL} alt=''></img>
        <span className='curname'>{currentUser.displayName}</span>
        <button onClick={()=>{signOut(auth); nav("/chat/login"); console.log("anand");}}>log out</button>
        </div>
       
    </div>
  )
}

export default Navbar