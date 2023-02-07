import React from 'react'
import { getTimeAgo } from "../../helpers/createTime"

const SingleItemOrder = (props) => {
    const item = props.item

    return (
        <>
            <div id={item._id} key={item._id} className="group">
                <div key={item._id} className=" rounded-lg border-2 border-purple-400 p-2 shadow">
                    <p className=" text-lg font-medium text-gray-900 text-center  ">{item.isTA ? "Type : T.A" : "Type : Table"}</p>
                    {item.tableNumber && <p className=" text-lg font-medium text-gray-900 mt-1 text-center">Number of table : {item.tableNumber}</p>}

                    {item.arrOfItems && item.arrOfItems.map((item) => (
                        <div key={item._id} className='border flex justify-between text-center  items-center align-middle mt-2 shadow '>
                            <p className=" text-lg font-medium  text-gray-900  p-1 mt-1" >{item.itemMenuId.name}</p>
                            <p className=" text-sm  text-gray-900  p-1 mt-1" >Note : {item.note}sgggg sgg sg sgsgsgsg sgssg </p>
                            <p className=" text-sm  text-gray-900  p-1 mt-1" >{getTimeAgo(item.createdAt)}</p>
                            <button className='border rounded-xl p-1 bg-green-400 hover:bg-green-600' onClick={() => { console.log(item.itemMenuId.name + " is ready") }}> Ready</button>

                        </div>))}
                </div>
            </div>
        </>
    )
}

export default SingleItemOrder

