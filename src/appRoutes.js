import React from 'react'
import Layout from './layout/layout'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/auth/home'
import Login from './components/auth/login'
import SignUp from './components/auth/signUp'
import NotFound from './components/notFound'
import Verification from './components/auth/verification'
import LayoutManager from './layoutManager/layoutManager'
import SuperLayout from './superLayout/superLayout'
import LayoutChef from './layoutChef/layoutChef'
import LayoutWaiter from './layoutWaiter/layoutWaiter'
import WorkerFill from './components/auth/workerFill'
import MyRestaurantsList from './components/auth/myRestaurantsList'
import NewRestaurant from './components/auth/newRestaurant'
import Orders from './components/worker/orders/orders'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/verification/:name' element={<Verification />} />

                <Route path='/' element={<SuperLayout />} >

                    {/*  Layout */}
                    <Route path='/' element={<Layout />}>
                        {/* Outlet */}
                        <Route path='/login' element={<Login />} />
                        <Route path='/signUp' element={<SignUp />} />
                        <Route path='/fillDetales' element={<WorkerFill />} />
                        <Route path='/myrestaurantlist' element={< MyRestaurantsList />} />
                        <Route path='/newrestaurant' element={< NewRestaurant />} />

                    </Route>

                    <Route path='/manager' element={<LayoutManager />}>
                    <Route path='/manager/orders' element={< Orders />} />


                        {/* Outlet */}

                    </Route>

                    <Route path='/chef' element={<LayoutChef />}>

                        {/* Outlet */}

                    </Route>

                    <Route path='/waiter' element={<LayoutWaiter />}>

                        {/* Outlet */}

                    </Route>

                </Route>

                {/*   (*) => Rest of routes!?!?  */}
                <Route path='*' element={<NotFound />} />

            </Routes>
        </Router>
    )
}

export default AppRoutes