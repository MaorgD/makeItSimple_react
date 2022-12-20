import React from 'react'
import { useDispatch } from 'react-redux'
import { onClickShowOrder } from '../../redux/featchers/toggleSlice'
import { getTimeAndDate } from "../../helpers/createTime"
const ItemOrder = (props) => {
    const dispatch = useDispatch()
    const item = props.item
    const dateCreate = getTimeAndDate(item.createdAt);
    const openItem = () => {
        dispatch(onClickShowOrder({ item: item }));
    }
    return (

        <>

            <div onClick={openItem}
                key={item._id} className="group">
                <div style={{
                    backgroundColor: item.isTA == true ? 'lightyellow' : '',
                    backgroundColor: item.byCustumer.isDelivery == true ? 'lightpink' : '',
                    backgroundColor: item.byCustumer.isDelivery == false && item.isTA == false ? 'lightblue' : '',
                }} className="p-2 w-full  rounded-lg bg-gray-200 ">

                    <h3 className=" text-sm text-gray-700 text-center pb-2">{item.status}</h3>
                    <p className=" text-lg font-medium text-gray-900">{item.finalPrice}</p>
                    <p className=" text-lg font-medium text-gray-900">{item.estimatedTime}</p>
                    <p className=" text-lg font-medium text-gray-900">{dateCreate}</p>
                </div>
            </div>
        </>
    )
}

export default ItemOrder