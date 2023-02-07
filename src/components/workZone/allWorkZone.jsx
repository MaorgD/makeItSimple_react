import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { API_URL, doApiTukenGet, RESTAURNAT_ID } from '../../services/servise'
import ItemOrder from '../orders/itemOrder';
import SingleItemOrder from './singleItemOrder';
import { io } from "socket.io-client";

const AllWorkZone = () => {
    const { restaurant } = useSelector((state) => state.restaurantSlice);
    const { user } = useSelector((state) => state.userSlice);

    const [allOrders, setAllOrders] = useState([]);
    const [displayOrdercards, setDisplayOrdercards] = useState([]);
    const [socket, setSocket] = useState(null);
    const [zone, setZone] = useState(null);

    useEffect(() => {
        setSocket(io(API_URL));
        console.log("ג")
        doApiGetAllTOrders()
    }, [])


    useEffect(() => {
        if (!socket) return
        console.log("Connect")
        socket.on('new-order-from-server', ( data ) => {
console.log(data)
            data.items.forEach(item => {
                console.log(zone)
                // console.log(item)
                console.log(item.itemMenuId.preparationArea)
                //if there is item that has the user zone choice
                if (item.itemMenuId.preparationArea == zone) {
                    let filter = displayOrdercards.filter((card) => card._id==data.order._id)
                    // setDisplayOrdercards()

                    console.log(filter)
                    console.log(displayOrdercards)
                    console.log(item)
                    console.log(data.order._id)
                }

            });
        });
    }, [socket])

    const doApiGetAllTOrders = async () => {
        try {
            let url = `${API_URL}/orders/${localStorage.getItem(RESTAURNAT_ID)}?active=b&ownerType=both&orderType=both`
            const { data } = await doApiTukenGet(url)
            if (data)
                setAllOrders(data)
            console.log(data)
            // setDisplayOrders(data)
            // מקבלים את כל ההזמנות 
        } catch (err) {
            console.log(err)
        }
    }

    // לקחת כל הזמנה לבדוק עם היא ISta\Delivery 
    // 
    const getOrdersOfDrink = (_kitchenZone) => {

        if (allOrders[0]) {
            let tempsArry = []
            allOrders.map((order) => {
                let isHave = false;
                if (order.orderItems) {

                    let orderCard = {
                        _id: order._id,
                        isTA: order.isTA,
                        arrOfItems: []
                    }
                    // console.log(order.orderItems)
                    order.orderItems.map((orderItem) => {
                        // console.log(orderItem);
                        if (orderItem.itemMenuId?.preparationArea == _kitchenZone) {

                            orderCard.arrOfItems.push(orderItem);
                            isHave = true;
                        };
                    });
                    if (isHave) {
                        // console.log(orderCard);
                        restaurant?.tables.map((table) => {
                            // console.log(table)
                            if (table.orderID && table.orderID._id == orderCard._id) {
                                orderCard.tableNumber = table.tableNumber
                            }
                        })
                        tempsArry.push(orderCard);
                    }
                }
            })
            setDisplayOrdercards(tempsArry);
        }
    }


    return (
        <div className='container  mx-auto'>
            <div className='text-center mx-0'>

                {user && ["manager", "bartender", "shiftManager"].some(i => user.data.worker.jobs.includes(i))
                    && restaurant && restaurant.kitchenZone.bars.map((zone) => (
                        <button key={zone} className='bg-purple-200 hover:bg-purple-500 rounded-full p-2 my-2 mx-2 mb-3' onClick={() => {
                            setZone(zone)
                            getOrdersOfDrink(zone)
                        }}>{zone}
                        </button>
                    ))}

                {user && ["manager", "chef", "shiftManager"].some(i => user.data.worker.jobs.includes(i))
                    && restaurant && restaurant.kitchenZone.kitchens.map((zone) => (
                        <button key={zone} className='bg-purple-200 hover:bg-purple-500 rounded-full p-2 my-2 mx-2 mb-3' onClick={() => {
                            setZone(zone)

                            getOrdersOfDrink(zone)
                        }}>{zone}
                        </button>
                    ))}
            </div>
            <div className="my-3 mx-auto grid grid-cols-1 gap-y-3 gap-x-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-4  ">
                {displayOrdercards && displayOrdercards.map((item) => (
                    <SingleItemOrder key={item._id} item={item} />
                ))}
            </div>

        </div>
    )
}

export default AllWorkZone