import React from 'react'
import { Outlet } from "react-router-dom"
import Header from '../components/worker/headerW'
import {navigationBartender} from '../services/navigation'


const LayoutBarthender = () => {
  return (
    <div>
      <Header navigation={navigationBartender} />
      <Outlet />
    </div>
  )
}

export default LayoutBarthender