import {createContext, useState } from "react";


export const Context = createContext()

export const CodeContext = ({children}) =>{
    const [play,setPlay] = useState([])
    const [playing,setPlaying] = useState(false)
    const [token, setToken] = useState(null)
  
    return(
        <Context.Provider value={{token,setToken,play,setPlay,playing,setPlaying}}>{children}</Context.Provider>
    )
}