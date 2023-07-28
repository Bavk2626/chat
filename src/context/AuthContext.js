import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState({});
    useEffect(()=>
    {
     const unSUb =  onAuthStateChanged(auth,(user) => {
            setCurrentUser(user);
            //console.log(currentUser);
        });

        return () => {
            unSUb();
        } 
    },[]);
    return (
    <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>);
};