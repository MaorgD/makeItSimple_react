import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RESTAURNAT_ID } from '../../services/servise'
import ItemOrder from './itemOrder';

const Orders = () => {
    // const user = useSelector(state => state.userSlice)
    const restaurant = useSelector(state => state.restaurantSlice.restaurant)
    // console.log(restaurant)
    // console.log(localStorage.getItem(RESTAURNAT_ID))

    const [activeOrders, setActiveOrders] = useState([]);
    const [ordersWorker, setOrdersOfWorker] = useState([]);
    const [ordersCoutmer, setOrdersOfCoutmer] = useState([]);
    // const [isSelecte, setIsSelecte] = useState(false);


    useEffect(() => {
        if (restaurant) {

            getAllactiveOrders()
        }
    }, [restaurant])

    const getAllactiveOrders = async () => {
        if (restaurant) {
            let tempsArr = []
            restaurant.orders.map((item) => {

                if (item.actice == true) {
                    // console.log(item);

                    tempsArr.push(item)
                }

            })
            setActiveOrders(tempsArr)
        }
        console.log(activeOrders)
    }
    const getOrderFilterByWorker = async () => {
        if (restaurant) {
            let tempsArry = []
            activeOrders.map((item) => {

                if (item.byCustumer.custumerID == null) {
                    // console.log(item);
                    console.log(item);

                    tempsArry.push(item)
                }

            })
            setOrdersOfWorker(tempsArry)
            // setIsSelecte(true)
            console.log(tempsArry)
        }
    }
    const getOrderFilterByCoutmer = async () => {
        if (restaurant) {
            let tempsArry = []
            activeOrders.map((item) => {

                if (item.byCustumer.custumerID != null) {
                    // console.log(item);
                    console.log(item);

                    tempsArry.push(item)
                }

            })
            setOrdersOfCoutmer(tempsArry)
            console.log(tempsArry)
        }
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    ORDERS :
                </h2>


                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 my-3">
                    {activeOrders && activeOrders.map((item) => (
                        <ItemOrder key={item._id} item={item} />
                    ))}

                </div>

                <button className='bg-red-500 rounded-lg p-3 '
                    onClick={() => { getOrderFilterByCoutmer() }}>coutmer

                </button>


                <button className='bg-red-500 rounded-lg ml-3 p-3 '
                    onClick={() => { getOrderFilterByWorker() }}>worker

                </button>

                {/* {<div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {
                        isSelecte && ordersWorker.map((item) => (
                            <ItemOrder key={item._id} item={item} />
                        ))}

                </div>} */}

                {/* <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 my-3">
                    <button className='bg-red-500 rounded-lg'
                        onClick={() => {
                            {
                                activeOrders &&
                                setActiveOrders((activeOrders.filter((item) => item.byWorker.workerID !== null)))
                                console.log(activeOrders)
                            }
                        }}>button

                    </button>


                </div> */}
                {/* <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 my-3">
                    {activeOrders && activeOrders.filter => byCustumer (
                            <ItemOrder key={item._id} item={item} />
                        ))}
            setsubCategories(tempsArr.filter(subCategory => subCategory != props.item.subCategory));

                </div> */}


                {/* להביא את כל ההזמנות של המסעדה ולסדר אותם בטבלה לפי הסוג הזמנה  */}
                {/* לייצר טבלה שתעבוד לפי פילטור של סוג ההזמנה , להןסיף את כל האופציות של עובד לבצע הזמנה (3 יש)ןלהיכנס להזמנה קיימת לראות בה הכל , למחוק הזמנה  */}
                {/* לעשות לפי סוג הזמנה בקגראונד מתאים */}
            </div>
        </div>
    )
}

export default Orders