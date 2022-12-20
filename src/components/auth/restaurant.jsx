import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantInfo, saveResrtaurant } from '../../redux/featchers/restaurantSlice';
import { RESTAURNAT_ID } from '../../services/servise'

const Restaurant = (props) => {

    const nav = useNavigate();
    const dispatch = useDispatch();

    let item = props.item;
    const onClickResta = () => {
        // dispatch(saveResrtaurant({ restaurantId: item._id }));
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
        <div key={item._id} className='col-md-4 overflow-hidden h-100'>
            {(item.name) ?
                <div onClick={() => { onClickResta() }} className='shadow p-2'>
                    <h2>{item.name}</h2>
                </div>

                : <h3>loading...</h3>}

        </div>
    )
}
export default Restaurant

