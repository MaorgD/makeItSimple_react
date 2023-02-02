import React, { useEffect, useState } from 'react'

const OrdersController = (props) => {

    const allOrders = props.allOrders
    const setDisplayOrders = props.setDisplayOrders
    const setCreator = props.setCreator
    const setOrderType = props.setOrderType
    const setActive = props.setActive
    const setSortType = props.setSortType
    const setIsReverse = props.setIsReverse


    return (

        <div className='border-4 rounded-md  shadow-2xl bg-violet-200 mb-6 pb-6 py-3'>
            <h2 className="m-5 text-center text-xl font-bold tracking-tight text-gray-900">
                ORDERS :
            </h2>
            <div className=' flex justify-evenly '>


                <div className='flex-col '>
                    <div className='mb-3 pl-6 '>
                        <label htmlFor='owner_diabled' >Owner</label>
                    </div>
                    <div>

                        <select onChange={(e) => setCreator(e.target.value)} id="owner_diabled" className="block py-2.5 mx-2 w-full text-sm text-black
                         bg-transparent border-0 border-b-2 border-black 
                         appearance-none
                         focus:outline-none focus:ring-0 focus:border-gray-700 peer " >
                            <option value={"both"}>All</option>
                            <option value={"worker"}>Worker</option>
                            <option value={"customer"}>Custumer</option>
                        </select>
                    </div>
                </div>



                <div className='flex-col'>
                    <div className='mb-3 pl-6'>

                        <label htmlFor="type_diabled">Type</label>
                    </div>
                    <div>

                        <select onChange={(e) => setOrderType(e.target.value)} id="type_diabled" className="block py-2.5 mx-1  w-full text-sm text-black
                         bg-transparent border-0 border-b-2 border-black 
                         appearance-none
                         focus:outline-none focus:ring-0 focus:border-gray-700 peer " >
                            <option value={"both"}>All</option>
                            <option value={"T.A"}>T.A</option>
                            <option value={"delivery"}>Delivery</option>
                            <option value={"table"}>Table</option>
                        </select>
                    </div>
                </div>


                <div className='flex-col'>
                    <div className='mb-3 pl-6'>

                        <label htmlFor="active_diabled">Active</label>
                    </div>
                    <div>

                        <select onChange={(e) => setActive(e.target.value)} id="active_diabled" className="block py-2.5 mx-1  w-full text-sm text-black
                         bg-transparent border-0 border-b-2 border-black 
                         appearance-none
                         focus:outline-none focus:ring-0 focus:border-gray-700 peer ">
                            <option value={"b"}>All</option>
                            <option value={"t"}>Active</option>
                            <option value={"f"} >Not Active</option>
                        </select>
                    </div>
                </div>

                <div className='flex-col'>
                    <div className='mb-3 pl-6'>

                        <label htmlFor="srot_diabled">Sort By</label>
                    </div>
                    <div>

                        <select onChange={(e) => setSortType(e.target.value)} id="srot_diabled" className="block py-2.5 mx-1  w-full text-sm text-black
                         bg-transparent border-0 border-b-2 border-black 
                         appearance-none
                         focus:outline-none focus:ring-0 focus:border-gray-700 peer ">
                            <option value={"createdAt"}>Date created</option>
                            <option value={"finalPrice"} >Final price</option>
                            <option value={"updatedAt"}>Updated</option>
                            <option value={"discount"}>Discount</option>
                        </select>

                    </div>
                </div>

                <div className='flex-col'>
                    <div className='mb-3 pl-6'>

                        <label htmlFor="reverse_diabled">Reverse</label>
                    </div>
                    <div>

                        <select onChange={(e) => setIsReverse(e.target.value)} id="reverse_diabled" className="block py-2.5 mx-1  w-full text-sm text-black
                         bg-transparent border-0 border-b-2 border-black 
                         appearance-none
                         focus:outline-none focus:ring-0 focus:border-gray-700 peer ">
                            <option value={"yes"}>Yes</option>
                            <option value={"no"} >No</option>

                        </select>

                    </div>
                </div>

            </div>


        </div >


    )
}

export default OrdersController


