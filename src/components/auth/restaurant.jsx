import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveResrtaurant } from '../../featchers/restaurantSlice';
import { TOKEN_RES_ID } from '../../services/servise'

const Restaurant = (props) => {
    const nav = useNavigate();
    const dispatch = useDispatch();

    let item = props.item;
    // console.log(item)
    const onClickResta = () => {
        dispatch(saveResrtaurant({ restaurantId: item._id }));
        localStorage.setItem(TOKEN_RES_ID, item._id)
        nav(`/manager/orders/`)
    }
    return (
        <div className='col-md-4 overflow-hidden h-100'>
            {(item.name) ?
                <div onClick={() => { onClickResta() }} className='shadow p-2'>
                    {/* לשמור את האידי של המסעדה store */}
                    {/* ליצור עמוד מסעדה  יור רסטורנט לפי הדר מנגר שמקבל פרופס מאותו מסעדה */}
                    <h2>{item.name}</h2>
                    {/* <button  onClick={() => {nav(`/myrestaurant/${item.id}`) }}></button> */}
                </div>

                : <h3>loading...</h3>}

        </div>
    )
}
export default Restaurant

