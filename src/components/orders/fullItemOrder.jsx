import React from 'react'
import { useDispatch } from 'react-redux'
import { onClickHideOrder } from '../../redux/featchers/toggleSlice'
import PopUPModel from '../ui/popUpModel'

const FullItemOrder = (props) => {
    const dispatch = useDispatch()
    const item = props.item
    console.log(item)
    const openItem = () => {
        dispatch(onClickHideOrder())
    }

    return (
        <PopUPModel>

            
                <div onClick={openItem} key={item._id} className="rounded-lg">
                    <div className='mx-3 space-y-5 my-2'>
                        <h3 className="text-2xl xl:text-3xl text-gray-700">{item.note}</h3>
                        {item.info != "" && <p className="mt-1 xl:text-2xl font-medium text-gray-900">{item.info}</p>}

                        <p className=" xl:text-2xl font-medium text-gray-900">status : {item.status}</p>
                        {item.calories > 0 && <p className="mt-1 xl:text-2xl font-medium text-gray-900">Calories : {item.estimatedTime}</p>}
                        <p className=" xl:text-2xl font-medium text-gray-900">finalPrice : {item.finalPrice}</p>

                    </div>
                    {item.orderItems[0] &&<div className="  p-2 rounded-lg bg-gray-200 ">
                        <table  className='table table-auto text-center'>
                            <thead className=" border-2 border-black ">
                                <tr  >
                                    <th className=" p-2" >
                                        name
                                    </th>
                                    <th className="p-2 border-2 border-black ">
                                        note

                                    </th>
                                    <th className=" p-2">
                                        price
                                    </th>
                                </tr>

                            </thead>
                            <tbody className=" border-2 border-black " >
                               
                                    {item.orderItems.map((orderItem) => (
                                        <tr key={orderItem._id}>
                                            <td className="p-2 border-2 border-black ">{orderItem?.itemMenuId?.name}</td>
                                            <td className="p-2 border-2 border-black ">{orderItem?.note}</td>
                                            <td className="p-2 border-2 border-black ">{orderItem?.itemMenuId?.price}</td>
                                        </tr>
                                    ))}

                                
                            </tbody >
                        </table>
                    </div>}
                </div>
            
        </PopUPModel>
    )
}

export default FullItemOrder