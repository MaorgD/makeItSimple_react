import React, { useEffect, Suspense } from 'react'
import Layout from './layout/layout'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Orders from './components/worker/orders/orders'
import { useDispatch, useSelector } from 'react-redux'
import { API_URL, TOKEN_NAME, doApiMethodRefresh } from './services/servise'
import jwt_decode from "jwt-decode";
import { saveInfo } from './featchers/restaurantSlice';
import Loader from './components/loader/loader'

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

const AppRoutes = () => {
    const dispatch = useDispatch();
    // let { user } = useSelector((state) => state.restaurantSlice);

    useEffect(() => {
        let token;
        if (localStorage.getItem(TOKEN_NAME)) {
            token = localStorage.getItem(TOKEN_NAME);

            const decoded = jwt_decode(token)
            if (decoded.exp < Date.now()) {
                getUserInfo();
            }
        }
    }, [])

    const getUserInfo = async () => {
        let url = API_URL + "/users/myInfo/"
        const { data } = await doApiMethodRefresh(url)
        console.log(data)

        if (!data._id) {
            alert("ffffffffffff")
            return
        }
        let user = {
            id: data._id,
            userRole: data.role,
            jobs: data.worker.jobs

        }
        console.log(user)
        dispatch(saveInfo({ userInfo: user }));
    }
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
                    <Route path='/verification/:name' element={<Verification />} />

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