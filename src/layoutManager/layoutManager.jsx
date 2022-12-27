import React from 'react'
import { Outlet } from "react-router-dom"
import Header from '../components/worker/headerW'
import {navigationManager} from '../services/navigation'


const LayoutManager = () => {
  return (
    <div>
      <Header navigation={navigationManager} />
      <Outlet />
    </div>
  )
}

export default LayoutManager
