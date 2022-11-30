import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Restaurant = (props) => {
    const nav = useNavigate();

    let item = props.item;
    return (
        <div className='col-md-4 overflow-hidden h-100'>
            {(item.name) ?
                <div onClick={() => { nav(`/manager/orders/`) }} className='shadow p-2'>
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

