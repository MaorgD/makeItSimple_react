import React, { useEffect, Suspense } from 'react'
import Layout from './layout/layout'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Orders from './components/orders/orders'
import { useDispatch, useSelector } from 'react-redux'
import { TOKEN_NAME, RESTAURNAT_ID } from './services/servise'
import Loader from './components/ui/loader/loader'
import { getUserInfo } from './redux/featchers/userSlice'
import Logout from './components/auth/logout'
import { getRestaurantInfo } from './redux/featchers/restaurantSlice'
import FullItemMenu from './components/menu/fullItemMenu'
import FullItemOrder from './components/orders/fullItemOrder'
import AddItemMenu from './components/menu/addItemMenu'
import EditItemMenu from './components/menu/editItemMenu'
import FullTableItem from './components/tables/fullTableItem'
import LayoutBarthender from './layoutBarthender/layoutBarthender'
import LayoutShiftManager from './layoutShiftManager/layoutShiftManager'
import LayoutCheker from './layoutCheker/layoutCheker'


const RequestResetPass = React.lazy(() => import('./components/auth/requestResetPass'));
const ResetPassword = React.lazy(() => import('./components/auth/resetPassword'));
const Home = React.lazy(() => import('./components/auth/home'));
const Login = React.lazy(() => import('./components/auth/login'));
const SignUp = React.lazy(() => import('./components/auth/signUp'));
const NotFound = React.lazy(() => import('./components/notFound'));
const LayoutManager = React.lazy(() => import('./layoutManager/layoutManager'));
const SuperLayout = React.lazy(() => import('./superLayout/superLayout'));
const LayoutChef = React.lazy(() => import('./layoutChef/layoutChef'));
const LayoutWaiter = React.lazy(() => import('./layoutWaiter/layoutWaiter'));
const WorkerFill = React.lazy(() => import('./components/auth/workerFill'));
const MyRestaurantsList = React.lazy(() => import('./components/auth/myRestaurantsList'));
const NewRestaurant = React.lazy(() => import('./components/auth/newRestaurant'));
const Messages = React.lazy(() => import('./components/messages'));
const Menu = React.lazy(() => import('./components/menu/menu'));
const Tables = React.lazy(() => import('./components/tables/tables'));
const RestaurantSettings = React.lazy(() => import('./layoutManager/restaurantSettings/restaurantSettings'));
const MyInfo = React.lazy(() => import('./components/worker/myInfo'));
const Shifts = React.lazy(() => import('./components/shifts/shifts'));
const Workers = React.lazy(() => import('./components/shifts/workers'));
const AddWorker = React.lazy(() => import('./components/shifts/addWorker'));
const AllWorkZone = React.lazy(() => import('./components/workZone/allWorkZone'));


const AppRoutes = () => {
    const dispatch = useDispatch();

    let { showiteminfo } = useSelector((state) => state.toggleSlice);
    let { showadditem } = useSelector((state) => state.toggleSlice);
    let { showorderiteminfo } = useSelector((state) => state.toggleSlice);
    let { showEditItem } = useSelector((state) => state.toggleSlice);
    let { showTableItem } = useSelector((state) => state.toggleSlice);
    let { item } = useSelector((state) => state.toggleSlice);
    let { TableItem } = useSelector((state) => state.toggleSlice);
    useEffect(() => {
        if (localStorage.getItem(TOKEN_NAME)) {
            dispatch(getUserInfo())
            if (localStorage.getItem(RESTAURNAT_ID)) {
                dispatch(getRestaurantInfo())
            }
            // window.location.replace('http://localhost:3000/myrestaurantlist')
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
                            <Route path='/manager/tables' element={< Tables />} />
                            <Route path='/manager/Shifts' element={< Shifts />} />
                            <Route path='/manager/workers' element={< Workers />} />
                            <Route path='/manager/AddWorker' element={<AddWorker />} />
                            <Route path='/manager/AllWorkZone' element={<AllWorkZone />} />
                            <Route path='/manager/Settings' element={< RestaurantSettings />} />
                            <Route path='/manager/myInfo' element={< MyInfo />} />



                            {/* Outlet */}

                        </Route>

                        <Route path='/chef' element={<LayoutChef />}>
                            <Route path='/chef/menu' element={< Menu />} />
                            {/* <Route path='/chef/tables' element={< Tables />} /> */}
                            <Route path='/chef/orders' element={< Orders />} />
                            <Route path='/chef/Shifts' element={< Shifts />} />
                            <Route path='/chef/AllWorkZone' element={<AllWorkZone />} />
                            <Route path='/chef/myInfo' element={< MyInfo />} />
                            <Route path='/chef/Settings' element={< RestaurantSettings />} />

                            {/* Outlet */}

                        </Route>

                        <Route path='/waiter' element={<LayoutWaiter />}>
                            <Route path='/waiter/orders' element={< Orders />} />
                            <Route path='/waiter/menu' element={< Menu />} />
                            <Route path='/waiter/tables' element={< Tables />} />
                            <Route path='/waiter/Shifts' element={< Shifts />} />
                            <Route path='/waiter/myInfo' element={< MyInfo />} />
                            <Route path='/waiter/Settings' element={< RestaurantSettings />} />

                            {/* Outlet */}

                        </Route>

                        <Route path='/barthender' element={<LayoutBarthender />}>
                            <Route path='/barthender/orders' element={< Orders />} />
                            <Route path='/barthender/menu' element={< Menu />} />
                            <Route path='/barthender/tables' element={< Tables />} />
                            <Route path='/barthender/Shifts' element={< Shifts />} />
                            <Route path='/barthender/myInfo' element={< MyInfo />} />
                            <Route path='/barthender/Settings' element={< RestaurantSettings />} />
                            <Route path='/barthender/AllWorkZone' element={<AllWorkZone />} />

                            {/* Outlet */}

                        </Route>

                        <Route path='/shiftManager' element={<LayoutShiftManager />}>
                            <Route path='/shiftManager/orders' element={< Orders />} />
                            <Route path='/shiftManager/menu' element={< Menu />} />
                            <Route path='/shiftManager/tables' element={< Tables />} />
                            <Route path='/shiftManager/myInfo' element={< MyInfo />} />
                            <Route path='/shiftManager/Settings' element={< RestaurantSettings />} />
                            <Route path='/shiftManager/Shifts' element={< Shifts />} />

                            {/* Outlet */}

                        </Route>

                        <Route path='/cheker' element={<LayoutCheker />}>
                            <Route path='/cheker/orders' element={< Orders />} />
                            <Route path='/cheker/menu' element={< Menu />} />
                            <Route path='/cheker/tables' element={< Tables />} />
                            <Route path='/cheker/myInfo' element={< MyInfo />} />
                            <Route path='/cheker/Settings' element={< RestaurantSettings />} />
                            <Route path='/cheker/Shifts' element={< Shifts />} />

                            {/* Outlet */}

                        </Route>

                    </Route>

                    {/*   (*) => Rest of routes!?!?  */}
                    <Route path='*' element={<NotFound />} />

                </Routes>
                {showiteminfo ? <FullItemMenu key={item._id} item={item} /> : null}
                {showorderiteminfo ? <FullItemOrder key={item._id} item={item} /> : null}
                {showadditem ? <AddItemMenu /> : null}
                {showEditItem ? <EditItemMenu item={item} /> : null}
                {showTableItem ? <FullTableItem item={TableItem} /> : null}
            </Router>
        </Suspense>
    )
}

export default AppRoutes;