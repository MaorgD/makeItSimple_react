import React from 'react'
import Layout from './layout/layout'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/auth/home'
import Login from './components/auth/login'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/*  Layout */}
                <Route index element={<Home />} />
                <Route path='/' element={<Layout />}>
                    {/* Outlet */}
                    {/* <Route index element={<Home />} /> */}
                    <Route path='/login' element={<Login />} />
                </Route>

                {/* <Route path='*' element={<NotFound />} /> */}

            </Routes>
        </Router>
    )
}

export default AppRoutes