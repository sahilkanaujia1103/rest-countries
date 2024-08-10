import React, { useContext, useState } from 'react'
import { Themecontext } from '../contexts/Themecontext'
import { useTheme } from '../Hooks/useTheme'

const Header = () => {
  const [isdark,setisdark] =useTheme()
 
  return (
    <header className={`header-container ${isdark?"dark":""}`}>
    <div className="header-content">
      <h2 className="title">
        <a href="/">Where in the world?</a>
      </h2>
      <p className="theme-changer" onClick={()=>{
        document.body.classList.toggle("dark")
        setisdark(!isdark)
        localStorage.setItem("isDarkmode",!isdark)
      }}>
        <i className={`fa-solid fa-${isdark?"sun":"moon"}`} /> &nbsp;&nbsp;{isdark?"Light":"Dark"} Mode
      </p>
    </div>
  </header>
  )
}

export default Header