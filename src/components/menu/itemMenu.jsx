import React from 'react'
import { useDispatch } from 'react-redux'
import { onClickShow } from '../../redux/featchers/toggleSlice'

const ItemMenu = (props) => {
    const dispatch = useDispatch()
    const item = props.item
    const fromTable = props.fromTable;
    const openItem = () => {
        dispatch(onClickShow({ item: item }));
    }

    return (

        <>
            <div onClick={() => { openItem() }} key={item._id} className="group ">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-4 xl:aspect-h-4">
                    <img
                        src={item.img}
                        alt={item.img}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>

                <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{item.price}</p>
                {fromTable && <button className='border-2 rounded-lg bg-green-500'>+</button>}
            </div>
        </>
    )
}

export default ItemMenu