import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './footer/footer'



const SuperLayout = () => {
  return (
    <>
        <Outlet/>
        <Footer/>

    </>
  )
}

export default SuperLayout