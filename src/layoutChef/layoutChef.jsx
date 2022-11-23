import React from 'react'
import { Outlet } from "react-router-dom"
import Header from '../components/worker/headerW'
import {navigationChef} from '../services/navigation'


const LayoutChef = () => {
console.log(navigationChef)
  return (
    <div>
      <Header navigation={navigationChef} />
      <Outlet />
    </div>
  )
}

export default LayoutChef