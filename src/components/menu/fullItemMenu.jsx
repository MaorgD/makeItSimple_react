import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onClickHide, onClickShowEditItem } from '../../redux/featchers/toggleSlice'
import { API_URL, doApiMethodTokenNotStringify, RESTAURNAT_ID } from '../../services/servise'
import PopUPModel from '../ui/popUpModel'

const FullItemMenu = (props) => {
    const { user } = useSelector((state) => state.userSlice);

    const dispatch = useDispatch()
    const item = props.item
    // console.log(user)
    const [isEditMode, setIsEditMode] = useState(false)
    const closeItem = () => {
        dispatch(onClickHide())

    }

    const openEditMode = () => {
        dispatch(onClickShowEditItem())

    }
    const onClickDelete = () => {
        // dispatch(onClickShowEditItem())
        if (window.confirm(`are you sure you want to delete ${item.name}?`))
            doApiDelete()

    }
    const doApiDelete = async () => {
        const url = `${API_URL}/menus/remove/${localStorage.getItem(RESTAURNAT_ID)}/${props.item._id}`;
        try {

            console.log(url);
            const data = await doApiMethodTokenNotStringify(url, "PATCH",);
            if (data) {
                window.location.reload(false);
            } else {
                console.log(data);
                alert(data)
            }
        }
        catch (err) {
            alert(err);
        }
    };

    return (
        <PopUPModel>

            <>
                <div key={item._id} className="rounded-lg">
                    <button onClick={closeItem}>X</button>

                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-4">
                        <img
                            src={item.img}
                            alt={item.img}
                            className="h-full w-full object-cover object-top -hover:opacity-75"
                        />
                    </div>
                    <div className='mx-3 space-y-5 my-2'>
                        <h3 className="text-2xl xl:text-3xl text-gray-700">{item.name}</h3>
                        {item.info != "" && <p className="mt-1 xl:text-2xl font-medium text-gray-900">{item.info}</p>}

                        <p className=" xl:text-2xl font-medium text-gray-900">price : {item.price}</p>
                        {item.calories > 0 && <p className="mt-1 xl:text-2xl font-medium text-gray-900">Calories : {item.calories}</p>}

                    </div>
                    {user?.data?.worker?.jobs.includes("manager") && <div className=" px-4 py-3  sm:px-6 flex justify-center">
                        <button onClick={() => { openEditMode() }}
                            type='button'
                            className="w-1/3 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            edit item</button>
                        <button onClick={() => { onClickDelete() }}
                            type='button'
                            className="w-1/3 rounded-md border border-transparent bg-red-500 py-2 px-4 text-lg font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            delete</button>
                    </div>}
                </div>
            </>
        </PopUPModel >
    )
}

export default FullItemMenu