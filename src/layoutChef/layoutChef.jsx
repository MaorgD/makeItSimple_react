import React from 'react'
import { Outlet } from "react-router-dom"
import Header from './header/header'
import {navigationChef} from '../services/navigation'


const LayoutChef = () => {
console.log(navigationChef)
  return (
    <div>
      <Header navigationChef={navigationChef} />
      <Outlet />
    </div>
  )
}

export default LayoutChef