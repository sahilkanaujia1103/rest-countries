import React from 'react'
import "./App.css"
import Header from './components/Header'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import {  Themeprovider } from './contexts/Themecontext'


const App = () => {
  return (
    
    <Themeprovider>
       <Header />
     <Outlet />
     </Themeprovider>
   
  )
}

export default App