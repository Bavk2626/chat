import React from 'react'
// import Cam from "../images/camera-icon-52.png"
// import Add from "../images/pngwing.com.png"
// import More from "../images/more.png"
import Messages from './Messages'
import Input from './Input'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
const Chat = () => {
  const {data} = useContext(ChatContext);
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
         <div className="chtIcons">
         <img src=""  alt=""></img>
          <img src=""  alt=""></img>
          <img src=""   alt=""></img> 
         </div>
      </div>
      <Messages></Messages>
      <Input/>
    </div>
  )
}

export default Chat