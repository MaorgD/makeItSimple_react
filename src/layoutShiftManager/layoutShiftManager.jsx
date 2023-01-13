import React from 'react'
import { Outlet } from "react-router-dom"
import Header from '../components/worker/headerW'
import {navigationShiftManager} from '../services/navigation'


const LayoutShiftManager = () => {
  return (
    <div>
      <Header navigation={navigationShiftManager} />
      <Outlet />
    </div>
  )
}

export default LayoutShiftManager