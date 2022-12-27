import React from 'react'
import { useDispatch } from 'react-redux'
import { onClickShowOrder } from '../../redux/featchers/toggleSlice'
import { getTimeAgo } from "../../helpers/createTime"
const ItemOrder = (props) => {
    const dispatch = useDispatch()
    const item = props.item
    const dateCreate = getTimeAgo(item.createdAt);
    const openItem = () => {
        dispatch(onClickShowOrder({ item: item }));
    }

    const divColor = () => {
        if (item.isTA)
            return "lightcoral"

        else if (item.byCustumer.isDelivery == false && item.isTA == false)
            return "lightpink"

        else if (item.byCustumer.isDelivery == true)
            return "lightsteelblue"
    };
    return (
        <>
               <div onClick={openItem}
                key={item._id} className="group">
                <div style={{ backgroundColor: divColor() }} className="p-2 w-full  rounded-lg  ">

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

