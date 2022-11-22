import React from 'react'
import { Outlet } from "react-router-dom"
import Footer from './footer/footer'
import Header from '../components/worker/home'
import {} from '../services/navigation'

const LayoutManager = () => {
  return (
    <div>
        <Header   />
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default LayoutManager
