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
                <div onClick={openItem} key={item._id} className="group">
                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                        <img
                            src={item.img}
                            alt={item.img}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">{item.price}</p>
                </div>
            </>
        </PopUPModel>
    )
}

export default FullItemMenu