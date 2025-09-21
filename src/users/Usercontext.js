import React, { useState } from 'react'
import { createContext } from 'react'

export const Usercontext = createContext()

export const UserProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [islogin,setislogin] = useState(false);

    return(
        <Usercontext.Provider value={{user,setUser,islogin,setislogin}}>
           {children}
        </Usercontext.Provider>
    );
}
    