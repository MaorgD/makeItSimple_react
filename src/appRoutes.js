import React from 'react'
import Layout from './layout/layout'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/*  Layout */}
                <Route path='/' element={<Layout />}>
                    {/* Outlet */}
                    {/* <Route index element={<Home />} />
                    <Route path='/about' element={<About />} /> */}
                </Route>
                {/* <Route path='*' element={<NotFound />} /> */}

            </Routes>
        </Router>
    )
}

export default AppRoutes