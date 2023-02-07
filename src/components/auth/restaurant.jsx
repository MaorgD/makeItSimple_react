import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getRestaurantInfo } from '../../redux/featchers/restaurantSlice';
import { RESTAURNAT_ID } from '../../services/servise'

const Restaurant = (props) => {

    const nav = useNavigate();
    const dispatch = useDispatch();
    let item = props.item;

    const onClickResta = () => {
        localStorage.setItem(RESTAURNAT_ID, item._id)
        dispatch(getRestaurantInfo())

        if (props.jobs.includes("manager"))
            nav(`/manager/orders/`)

        else if (props.jobs.includes("chef"))
            nav("/chef/AllWorkZone");

        else if (props.jobs.includes("waiter"))
            nav(`/waiter/orders/`)
    }

    return (
        <>
                {item.name ?
                    <div onClick={() => { onClickResta() }} className='p-2 rounded-xl shadow bg-indigo-100 hover:bg-indigo-300  my-2'>
                        <h2 className='text-center'>{item.name}</h2>
                    </div>

                    : <h3>loading...</h3>}
        </>
    )
}
export default Restaurant

