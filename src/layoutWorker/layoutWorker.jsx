import React from 'react'
import { Outlet } from "react-router-dom"
import Footer from './footer/footer'
import Header from './header/header'

const LayoutWorker = () => {
  return (
    <div>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default LayoutWorker
