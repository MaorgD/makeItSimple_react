import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { API_URL, doApiTukenGet, RESTAURNAT_ID } from '../../services/servise'
import ItemOrder from '../orders/itemOrder';
import SingleItemOrder from './singleItemOrder';

const AllWorkZone = () => {
    const { restaurant } = useSelector((state) => state.restaurantSlice);

    const [allOrders, setAllOrders] = useState([]);
    const [displayOrdercards, setDisplayOrdercards] = useState([]);

    useEffect(() => {
        doApiGetAllTOrders()
    }, [])


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
                        if (orderItem.itemMenuId.preparationArea == _kitchenZone) {

                            // console.log(orderItem);
                            orderCard.arrOfItems.push(orderItem);
                            isHave = true;
                        };
                    });
                    if (isHave) {
                        console.log(orderCard);
                        restaurant?.tables.map((table) => {
                            console.log(table)
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
                {restaurant && restaurant?.kitchenZone.map((zone) => (
                    <button key={zone} className='bg-purple-200 hover:bg-purple-500 rounded-full p-2 my-2 mx-2 mb-3' onClick={() => {
                        getOrdersOfDrink(zone)
                    }}>{zone}
                    </button>
                ))}
            </div>
            <div className="my-3 mx-auto grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8  ">
                {displayOrdercards && displayOrdercards.map((item) => (
                    <SingleItemOrder key={item._id} item={item} />
                ))}
            </div>

        </div>
    )
}

export default AllWorkZone