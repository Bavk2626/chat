import React, { useState } from 'react'
import add from '../images/avtar.png'
import { createUserWithEmailAndPassword ,updateProfile} from "firebase/auth";
import {auth,storage,db} from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate ,Link} from 'react-router-dom';

const Register = () => {
  const nav = useNavigate();

  const [err,setErr] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
try{
const res = await createUserWithEmailAndPassword(auth, email, password);
console.log(res);

const storageRef = ref(storage, displayName);

const uploadTask =  uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default :
        console.log("default");
    }
  }, 
  (error) => {
    setErr(true);
  }, 
  () => {

    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
      console.log('File available at', downloadURL);
      await updateProfile(res.user,{displayName,photoURL:downloadURL});
      await setDoc(doc(db, "users", res.user.uid), {
        uid : res.user.uid,
        displayName,
        email,
        photoURL:downloadURL,
      });
      await setDoc(doc(db,"usersChat",res.user.uid),{});
      nav('/')
    });
    
  }
);
}
catch(err){
  console.log("jhgfds");
setErr(true);
}
  }
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Am chat</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Name'/>
                <input type='email' placeholder='Email'/>
                <input type='password' placeholder='password'/>
                <input type='file' style={{display :"none"} }id='file1'/>
                <label htmlFor='file1'>
                    <img src={add} alt=""/>
                    <span>Add your profile</span>
                </label>
                <button>Sing up</button>
            </form> 
            {err ? <span className='err'>something went wrong</span>:<></>}
            <p>You do have an account ? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register