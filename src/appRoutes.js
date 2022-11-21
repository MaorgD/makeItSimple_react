import React from 'react'
import Layout from './layout/layout'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './components/auth/home'
import Login from './components/auth/login'
import SignUp from './components/auth/signUp'
import LayoutWorker from './layoutWorker/layoutWorker'
import NotFound from './components/notFound'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
מ
                <Route index element={<Home />} />

                {/*  Layout */}
                <Route path='/' element={<Layout />}>
                    {/* Outlet */}
                    <Route path='/login' element={<Login />} />
                    <Route path='/signUp' element={<SignUp />} />
                </Route>

                <Route path='/worker' element={<LayoutWorker />}>

                    {/* Outlet */}
                    
                </Route>

                {/*   (*) => Rest of routes!?!?  */}
                <Route path='*' element={<NotFound />} />

            </Routes>
        </Router>
    )
}

export default AppRoutes