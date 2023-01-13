import React from 'react'
import { Outlet } from "react-router-dom"
import Header from '../components/worker/headerW'
import {navigationWaiter} from '../services/navigation'


const LayoutWaiter = () => {
  return (
    <>
      <Header navigation={navigationWaiter} />
      <Outlet />
    </>
  )
}

export default LayoutWaiter