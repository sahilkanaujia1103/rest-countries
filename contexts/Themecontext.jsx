import { createContext, useState } from "react";

 export const Themecontext=createContext("sahil")
 export function Themeprovider({children}){
    const [isdark,setisdark]=useState(JSON.parse(localStorage.getItem("isDarkmode")))
    return(<Themecontext.Provider value={[isdark,setisdark]}>{children}</Themecontext.Provider>)
    
 }