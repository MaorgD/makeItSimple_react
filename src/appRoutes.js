import React from 'react'
import Layout from './layout/layout'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/auth/home'
import Login from './components/auth/login'
import SignUp from './components/auth/signUp'
import NotFound from './components/notFound'
import Verification from './components/auth/verification'
import LayoutManager from './layoutWorker/layoutWorker'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route index element={<Home />} />
                <Route path='/verification/:name' element={<Verification />} />

                {/*  Layout */}
                <Route path='/' element={<Layout />}>
                    {/* Outlet */}
                    <Route path='/login' element={<Login />} />
                    <Route path='/signUp' element={<SignUp />} />
                </Route>

                <Route path='/manager' element={<LayoutManager />}>

                    {/* Outlet */}

                </Route>

                {/*   (*) => Rest of routes!?!?  */}
                <Route path='*' element={<NotFound />} />

            </Routes>
        </Router>
    )
}

export default AppRoutes