import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Restaurant = (props) => {
    const nav = useNavigate();

    let item = props.item;
    return (
        <div className='col-md-4 overflow-hidden h-100'>
            {(item.name) ?
                <div className='shadow p-2'>
                    <h2>{item.name}</h2>
                    <button onClick={() => {
                        nav(`/myrestaurant/${item.id}`)
                        // לבדוק שהמעבר של הנאב בסדר ולבדוק שיש דף מיי רסטורנט שיציג מסעדה לפי הזרקת פרטים

                    }}></button>
                </div>
                : <h3>loading...</h3>}
        </div>
    )
}

export default Restaurant

