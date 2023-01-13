import React from 'react'
import { Outlet } from "react-router-dom"
import Header from '../components/worker/headerW'
import {navigationCheker} from '../services/navigation'


const LayoutCheker = () => {
  return (
    <div>
      <Header navigation={navigationCheker} />
      <Outlet />
    </div>
  )
}

export default LayoutCheker