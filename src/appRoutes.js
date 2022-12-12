import React, { useEffect, Suspense } from 'react'
import Layout from './layout/layout'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Orders from './components/worker/orders/orders'
import { useDispatch } from 'react-redux'
import { TOKEN_NAME, RESTAURNAT_ID } from './services/servise'
import Loader from './components/loader/loader'
import { getUserInfo } from './redux/featchers/userSlice'
import Logout from './components/auth/logout'
import { getRestaurantInfo } from './redux/featchers/restaurantSlice'

const RequestResetPass = React.lazy(() => import('./components/auth/requestResetPass'));
const ResetPassword = React.lazy(() => import('./components/auth/resetPassword'));
const Home = React.lazy(() => import('./components/auth/home'));
const Login = React.lazy(() => import('./components/auth/login'));
const SignUp = React.lazy(() => import('./components/auth/signUp'));
const NotFound = React.lazy(() => import('./components/notFound'));
const Verification = React.lazy(() => import('./components/auth/verification'));
const LayoutManager = React.lazy(() => import('./layoutManager/layoutManager'));
const SuperLayout = React.lazy(() => import('./superLayout/superLayout'));
const LayoutChef = React.lazy(() => import('./layoutChef/layoutChef'));
const LayoutWaiter = React.lazy(() => import('./layoutWaiter/layoutWaiter'));
const WorkerFill = React.lazy(() => import('./components/auth/workerFill'));
const MyRestaurantsList = React.lazy(() => import('./components/auth/myRestaurantsList'));
const NewRestaurant = React.lazy(() => import('./components/auth/newRestaurant'));
const Messages = React.lazy(() => import('./components/messages'));
const Menu = React.lazy(() => import('./components/menu/menu'));



const AppRoutes = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem(TOKEN_NAME)) {
            dispatch(getUserInfo())
        }
        if (localStorage.getItem(RESTAURNAT_ID)) {
            dispatch(getRestaurantInfo())
        }
    }, [])





    return (
        <Suspense fallback={
            <div className='w-full flex justify-center h-screen items-center'>

                <Loader />
            </div>
        }
        >

            <Router>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='/messages/' element={<Messages />} />
                    <Route path='/logout/' element={<Logout />} />

                    <Route path='/' element={<SuperLayout />} >

                        {/*  Layout */}
                        <Route path='/' element={<Layout />}>
                            {/* Outlet */}
                            <Route path='/requestResetPass' element={<RequestResetPass />} />
                            <Route path='/resetPassword/:userId/:uniqueString' element={<ResetPassword />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/signUp' element={<SignUp />} />
                            <Route path='/fillDetales/:userId' element={<WorkerFill />} />
                            <Route path='/myrestaurantlist' element={< MyRestaurantsList />} />
                            <Route path='/newrestaurant' element={< NewRestaurant />} />

                        </Route>

                        <Route path='/manager' element={<LayoutManager />}>
                            <Route path='/manager/orders' element={< Orders />} />
                            <Route path='/manager/menu' element={< Menu />} />



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
        </Suspense>
    )
}

export default AppRoutes;