import React from 'react'
import { Outlet } from "react-router-dom"
import Header from './header/header'
import {navigationWaiter} from '../services/navigation'


const LayoutWaiter = () => {
console.log(navigationWaiter)
  return (
    <div>
      <Header navigationWaiter={navigationWaiter} />
      <Outlet />
    </div>
  )
}

export default LayoutWaiter