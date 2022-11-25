import React from 'react'

const Restaurant = (props) => {
    let item = props.item;
    return (
        <div className='col-md-4 overflow-hidden h-100'>
            {(item.name) ?
                <div className='shadow p-2'>
                    <h2>{item.name}</h2>
                    
                </div>
                : <h3>loading...</h3>}
        </div>
    )
}

export default Restaurant