import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onClickHide, onClickHideTableInfo } from '../../redux/featchers/toggleSlice'
import { API_URL, doApiMethodTokenNotStringify, RESTAURNAT_ID } from '../../services/servise'
import PopUPModel from '../ui/popUpModel'
import Menu from '../menu/menu'
const FullTableItem = (props) => {
    const { user } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch()
    const item = props.item
    console.log(item)
    // משתמשים בסטייט?
    // const [isEditMode, setIsEditMode] = useState(false)
    const closeItem = () => {
        dispatch(onClickHideTableInfo())
    }


    // const onClickDelete = () => {
    //     if (window.confirm(`are you sure you want to delete ${item.name}?`))
    //         doApiDelete()

    // }
    // const doApiDelete = async () => {
    //     const url = `${API_URL}/menus/remove/${localStorage.getItem(RESTAURNAT_ID)}/${props.item._id}`;
    //     try {
    //         const data = await doApiMethodTokenNotStringify(url, "PATCH",);
    //         if (data) {
    //             window.location.reload(false);
    //         } else {
    //             console.log(data);
    //             alert(data)
    //         }
    //     }
    //     catch (err) {
    //         alert(err);
    //     }
    // };

    return (
        <PopUPModel>

            <>
                <div key={item._id} className="rounded-lg">
                    <button onClick={closeItem}>X</button>


                    <div className='mx-3 space-y-5 my-2'>
                        <h3 className="text-2xl xl:text-3xl text-gray-700">table Number :{item?.tableNumber}</h3>
                        {item.status != "" && <p className="mt-1 xl:text-2xl font-medium text-gray-900">status : {item.status}</p>}

                        <p className=" xl:text-2xl font-medium text-gray-900">seats : {item?.seats}</p>
                        <p className=" xl:text-2xl font-medium text-gray-900">created At : {item?.createdAt}</p>
                        {item.calories > 0 && <p className="mt-1 xl:text-2xl font-medium text-gray-900">Calories : {item.calories}</p>}

                    </div>
                    {item.orderID &&
                        <div className='mx-3 space-y-5 my-2 bg-red-200 rounded-xl p-2'>
                            <h3 className="text-2xl xl:text-3xl text-gray-700">status :{item.orderID?.status}</h3>
                            <p className="mt-1 xl:text-2xl font-medium text-gray-900">finalPrice :{item.orderID.finalPrice}</p>
                            {item.orderID.note != "" && <p className="mt-1 xl:text-2xl font-medium text-gray-900">note : {item.orderID.note}</p>}
                            {item.orderID.estimatedTime && <p className="mt-1 xl:text-2xl font-medium text-gray-900">estimated Time : {item.orderID.estimatedTime}</p>}

                            <p className=" xl:text-2xl font-medium text-gray-900">created At : {item.createdAt}</p>
                            {item.calories > 0 && <p className="mt-1 xl:text-2xl font-medium text-gray-900">Calories : {item.calories}</p>}

                        </div>}
                    {item.isCatched&&<Menu fromTable={true}/>}
                    {(user?.data?.worker?.jobs.includes("manager") ||
                        user?.data?.worker?.jobs.includes("waiter")) &&
                        <div className=" px-4 py-3  sm:px-6 flex justify-center">
                            <button onClick={() => { console.log("add to order") }}
                                type='button'
                                className="w-1/3 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                add to order</button>
                            <button onClick={() => { console.log(" edit order Details") }}
                                type='button'
                                className="w-1/3 rounded-md border border-transparent bg-red-500 py-2 px-4 text-lg font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                edit order Details</button>
                        </div>}
                </div>
            </>
        </PopUPModel >
    )
}

export default FullTableItem