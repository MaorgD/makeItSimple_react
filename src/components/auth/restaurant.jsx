import React from 'react'
import {  useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveResrtaurant } from '../../featchers/restaurantSlice';
import { TOKEN_RES_ID } from '../../services/servise'

const Restaurant = (props) => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    let item = props.item;
    const onClickResta = () => {
        dispatch(saveResrtaurant({ restaurantId: item._id }));
        localStorage.setItem(TOKEN_RES_ID, item._id)
        nav(`/manager/orders/`)
    }
    return (
        <div className='col-md-4 overflow-hidden h-100'>
            {(item.name) ?
                <div onClick={() => { onClickResta() }} className='shadow p-2'>
                    <h2>{item.name}</h2>
                </div>

                : <h3>loading...</h3>}

        </div>
    )
}
export default Restaurant

