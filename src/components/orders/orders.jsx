import React, { useEffect, useState } from 'react'
import { RESTAURNAT_ID, doApiTukenGet, API_URL } from '../../services/servise'
import ItemOrder from './itemOrder';
import OrdersController from './ordersController';

const Orders = () => {
    const [allOrders, setAllOrders] = useState([]);
    const [displayOrders, setDisplayOrders] = useState([]);
    const [creator, setCreator] = useState("both");
    const [orderType, setOrderType] = useState("both");
    const [active, setActive] = useState("b");
    const [sortType, setSortType] = useState("createdAt");
    const [isReverse, setIsReverse] = useState("yes");


    useEffect(() => {

        doApiGetAllOrders()

    }, [creator, orderType, active, sortType, isReverse])


    const doApiGetAllOrders = async () => {
        try {
            let url = `${API_URL}/orders/${localStorage.getItem(RESTAURNAT_ID)}?active=${active}&ownerType=${creator}&orderType=${orderType}&sort=${sortType}&reverse=${isReverse}`
            const { data } = await doApiTukenGet(url)

            if (data)
                setAllOrders(data)
            // console.log(data)
            setDisplayOrders(data)
        } catch (err) {
            console.log(err)

        }
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-10 sm:px-1 lg:max-w-7xl lg:px-8">

                {<OrdersController allOrders={allOrders} setDisplayOrders={setDisplayOrders} setSortType={setSortType} setActive={setActive} setOrderType={setOrderType} setCreator={setCreator} setIsReverse={setIsReverse} />}

                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 my-3">
                    {displayOrders && displayOrders.map((item) => (
                        <ItemOrder key={item._id} item={item} />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Orders