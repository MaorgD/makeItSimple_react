import React from 'react'
import { Outlet } from "react-router-dom"
import Header from './header/header'
import {navigationManager} from '../services/navigation'


const LayoutManager = () => {
console.log(navigationManager)
  return (
    <div>
      <Header navigationManager={navigationManager} />
      <Outlet />
    </div>
  )
}

export default LayoutManager
