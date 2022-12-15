import React from 'react'
import { useDispatch } from 'react-redux'
import { onClickHide } from '../../redux/featchers/toggleSlice'
import PopUPModel from '../ui/popUpModel'

const FullItemMenu = (props) => {
    const dispatch = useDispatch()
    const item = props.item
    console.log(item)
    const openItem = () => {
        dispatch(onClickHide())
    }

    return (
        <PopUPModel>

            <>
                <div onClick={openItem} key={item._id} className="rounded-lg">
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
                </div>
            </>
        </PopUPModel>
    )
}

export default FullItemMenu