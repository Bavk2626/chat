import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import {v4 as uuid} from 'uuid'
import { Timestamp, arrayUnion, updateDoc ,doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Input = () => {
  const [text,setText] = useState("");
  const [en,setEn] = useState(true);
  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);
  console.log(data.chatId);

  useEffect(()=> {

    if(data.chatId===null)
    {
      console.log("anad");
      setEn(false);
      //console.log(en);
    }

  },[data.chatId])
  const handleSend = async() => {

      await updateDoc(doc(db,"chats",data.chatId),{
        message : arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now(),
        })
      });

    

    await updateDoc(doc(db,"usersChat",currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]:serverTimestamp(),
    });

    await updateDoc(doc(db,"usersChat",data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]:serverTimestamp(),
    });
    setText("");

  }
  return (
    <div className='input'>
        <input type="text" placeholder='type something...!' onChange={(e)=> {setText(e.target.value)}} value={text }></input>
        {en  && <div className="send">
           <button onClick={handleSend}>Send</button>
        </div>}
    </div>
  )
}

export default Input