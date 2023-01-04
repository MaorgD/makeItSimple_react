import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getRestaurantInfo } from '../../redux/featchers/restaurantSlice';
import { RESTAURNAT_ID } from '../../services/servise'

const Restaurant = (props) => {

    const nav = useNavigate();
    const dispatch = useDispatch();

    let item = props.item;
    console.log(item);
    const onClickResta = () => {
        localStorage.setItem(RESTAURNAT_ID, item._id)
        dispatch(getRestaurantInfo())


        if (props.jobs.includes("manager"))
            nav(`/manager/orders/`)
        else if (props.jobs.includes("chef"))
            nav("/chef/orders/");

        else if (props.jobs.includes("waiter"))
            nav(`/waiter/orders/`)

    }
    return (
        <>
            <div key={item._id} className=' my-3 grid lg:grid-cols-1 lg:gap-y-6 overflow-hidden h-100'>
                {(item.name) ?
                    <div onClick={() => { onClickResta() }} className='aspect-w-2 aspect-h-1 overflow-hidden shadow  '>
                        <h2 className='text-center'>{item.name}</h2>
                    </div>

                    : <h3>loading...</h3>}

            </div>
            {/* <div class="grid lg:grid-cols-1 lg:gap-y-6">
                <div class="aspect-w-2 aspect-h-1 overflow-hidden rounded-lg">
                    maor
                </div>
                <div class="aspect-w-2 aspect-h-1 overflow-hidden rounded-lg">
                    ben                </div>
            </div> */}
        </>
    )
}
export default Restaurant

