import React, { useEffect, useState } from 'react'

const OrdersController = (props) => {

    const allOrders = props.allOrders
    const setDisplayOrders = props.setDisplayOrders
    const setCreator = props.setCreator
    const setOrderType = props.setOrderType
    const setActive = props.setActive
    const setSortType = props.setSortType
    const setIsReverse = props.setIsReverse

    const getAllactiveOrders = async () => {
        // console.log(allOrders)
        if (allOrders[0]) {
            let tempsArr = []
            allOrders.map((item) => {

                if (item.active == true) {
                    // console.log(item);

                    tempsArr.push(item)
                }

            })
            setDisplayOrders(tempsArr)
        }
        // console.log(activeOrders)
    }
    const getOrderFilterByWorker = async () => {
        if (allOrders[0]) {
            let tempsArry = []
            allOrders.map((item) => {

                if (item.byCustumer.custumerID == null) {
                    // console.log(item);
                    // console.log(item);

                    tempsArry.push(item)
                }

            })
            setDisplayOrders(tempsArry)
            // setIsSelecte(true)
            console.log(tempsArry)
        }
    }
    const getOrderFilterByCoutmer = async () => {
        if (allOrders[0]) {
            let tempsArry = []
            allOrders.map((item) => {

                if (item.byCustumer.custumerID != null) {
                    // console.log(item);
                    // console.log(item);

                    tempsArry.push(item)
                }

            })
            setDisplayOrders(tempsArry)
            console.log(tempsArry)
        }
    }



    return (

        <div className='border-4 p-2 rounded-md  shadow-2xl bg-violet-200 m-3 py-6'>
            <h2 className="m-5 text-center text-xl font-bold tracking-tight text-gray-900">
                ORDERS :
            </h2>
            <div className=' flex justify-evenly '>
                <div className='flex-col'>
                    <div>

                        <label htmlFor="">Ordr Owner Type</label>
                    </div>
                    <div>

                        <select onChange={(e) => setCreator(e.target.value)} >
                            <option value={"both"}>all</option>
                            <option value={"worker"}>worker</option>
                            <option value={"customer"}>custumer</option>
                        </select>
                    </div>
                </div>

                <div className='flex-col'>
                    <div>

                        <label htmlFor="">Order Type</label>
                    </div>
                    <div>

                        <select onChange={(e) => setOrderType(e.target.value)}>
                            <option value={"both"}>all</option>
                            <option value={"T.A"}>T.A</option>
                            <option value={"delivery"}>delivery</option>
                            <option value={"table"}>table</option>
                        </select>
                    </div>
                </div>
                <div className='flex-col'>
                    <div>

                        <label htmlFor="">Active</label>
                    </div>
                    <div>

                        <select onChange={(e) => setActive(e.target.value)}>
                            <option value={"b"}>all</option>
                            <option value={"t"}>Active</option>
                            <option value={"f"} >Not Active</option>
                        </select>
                    </div>
                </div>
                <div className='flex-col'>
                    <div>

                        <label htmlFor="">Sort By</label>
                    </div>
                    <div>

                        <select onChange={(e) => setSortType(e.target.value)}>
                            <option value={"createdAt"}>Date created</option>
                            <option value={"finalPrice"} >Final price</option>
                            <option value={"updatedAt"}>Updated</option>
                            <option value={"discount"}>Discount</option>
                        </select>
                        <div>

                            <label htmlFor="">Reverse</label>
                        </div>
                        <select onChange={(e) => setIsReverse(e.target.value)}>
                            <option value={"yes"}>yes</option>
                            <option value={"no"} >no</option>

                        </select>
                    </div>
                </div>
            </div>


        </div>


    )
}

export default OrdersController


