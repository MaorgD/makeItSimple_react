import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './footer/footer'



const SuperLayout = () => {
  return (
    <React.Fragment>
        <Outlet/>
        <Footer/>

    </React.Fragment>
  )
}

export default SuperLayout