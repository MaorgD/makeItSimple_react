import React from 'react'
import { Outlet } from "react-router-dom"
import Header from '../components/worker/headerW'
import {navigationWaiter} from '../services/navigation'


const LayoutWaiter = () => {
  return (
    <div>
      <Header navigation={navigationWaiter} />
      <Outlet />
    </div>
  )
}

export default LayoutWaiter