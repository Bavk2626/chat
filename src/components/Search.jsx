import React, { useContext, useState } from 'react'
import { collection, query, where,getDoc,getDocs, updateDoc, serverTimestamp,doc,setDoc } from "firebase/firestore";
import {db} from "../firebase";
import {AuthContext} from "../context/AuthContext";
const Search = () => {
  const [username,setUserName] = useState("");
  const [user,setUser] = useState(null);
  const [err,setErr] = useState(false);

  const {currentUser} = useContext(AuthContext)
  const handleSearch = async () => {
    
try 
{
  const q = query(collection(db,"users"),where("displayName","==",username));
    const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
   setUser(doc.data())
});
if(querySnapshot.docs.length===0)
{
  setErr(true);
  setUser(null);
}
else 
{
  setErr(false);
}
}
catch(error)
{
  
}

  }; 
  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid+user.uid : user.uid+currentUser.uid;
    console.log(combinedId);
    try{
      const res = await getDoc(doc(db,"chats",combinedId));

      if(!res.exists())
      {
        await setDoc(doc(db,"chats",combinedId),{message : []});

        await updateDoc(doc(db,"usersChat",currentUser.uid),
        {
          [combinedId+".userInfo"]:{
            uid : user.uid,
            displayName : user.displayName,
            photoURL : user.photoURL
          },
          [combinedId+".data"] : serverTimestamp()
        });

        await updateDoc(doc(db,"usersChat",user.uid),
        {
          [combinedId+".userInfo"]:{
            uid : currentUser.uid,
            displayName : currentUser.displayName,
            photoURL : currentUser.photoURL
          },
          [combinedId+".data"] : serverTimestamp()
        });
      }
  

    }
    catch(err)
    {

    }
    setUser(null);
    setUserName("");

  };

  const handleKey = (e) =>{
    e.code === 'Enter' && handleSearch();
  };
  return (
    <div className='serach'>
        <div className='searchForm'>
            <input type='text' placeholder='find a user' onKeyDown={handleKey} onChange={(e) => {setUserName(e.target.value)}} value={username}></input>
        </div>
        {err && <span>User Not Found</span>}

        { user && <div className='userChat' onClick={handleSelect}>
            <img src={user.photoURL} alt=''></img>
            <div className='userChatInfo'>
                <span>{user.displayName}</span>

            </div>

        </div> } 
    </div>
  )
}

export default Search