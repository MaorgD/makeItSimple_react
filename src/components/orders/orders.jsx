import React, { useEffect, useState } from 'react'
// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RESTAURNAT_ID, doApiTukenGet, API_URL } from '../../services/servise'
import ItemOrder from './itemOrder';
import OrdersController from './ordersController';

const Orders = () => {
    // const user = useSelector(state => state.userSlice)
    const restaurant = useSelector(state => state.restaurantSlice.restaurant)
    // console.log(restaurant)
    // console.log(localStorage.getItem(RESTAURNAT_ID))

    const [allOrders, setAllOrders] = useState([]);
    const [displayOrders, setDisplayOrders] = useState([]);

    const [creator, setCreator] = useState("both");
    const [orderType, setOrderType] = useState("both");
    const [active, setActive] = useState("b");
    const [sortType, setSortType] = useState("all type");
    // const [ordersCoutmer, setOrdersOfCoutmer] = useState([]);
    // const [isSelecte, setIsSelecte] = useState(false);


    useEffect(() => {

        doApiGetAllOrders()

    }, [])
    useEffect(() => {

        console.log(creator)
        console.log(orderType)
        console.log(active)
        // console.log(sortType)
        doApiGetAllOrders()

    }, [creator, orderType, active])


    const doApiGetAllOrders = async () => {
        try {
            let url = `${API_URL}/orders/${localStorage.getItem(RESTAURNAT_ID)}?active=${active}&ownerType=${creator}&orderType=${orderType}`
            // let urlGet = API_URL + '/orders/' + localStorage.getItem(RESTAURNAT_ID);
            const { data } = await doApiTukenGet(url)
            console.log(data)

            if (data)
                setAllOrders(data)
            setDisplayOrders(data)
        } catch (err) {
            console.log(err)
            // alert(err.response.data.msg || err.response.data[0].message)
        }

    }




    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                {/* <h5 className="m-5 text-center text-3xl font-bold tracking-tight text-gray-900">
                    ORDERS :
                </h5> */}
                {<OrdersController allOrders={allOrders} setDisplayOrders={setDisplayOrders} setSortType={setSortType} setActive={setActive} setOrderType={setOrderType} setCreator={setCreator} />}


                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 my-3">
                    {displayOrders && displayOrders.map((item) => (
                        <ItemOrder key={item._id} item={item} />
                    ))}

                </div>


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