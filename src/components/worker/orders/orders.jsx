import React from 'react'
import { useSelector } from 'react-redux';
import { TOKEN_RES_ID } from '../../../services/servise'

const Orders = () => {
    const userInfo = useSelector(state => state.restaurantSlice.user)
    const restaurantId = useSelector(state => state.restaurantSlice.restaurantId)
    console.log(userInfo)
    console.log(restaurantId)
    console.log(localStorage.getItem(TOKEN_RES_ID))
    return (
        <div >



        </div>
    )
}

export default Orders