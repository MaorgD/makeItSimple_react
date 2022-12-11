import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logoutRestaurant } from '../../redux/featchers/restaurantSlice';
import { logoutUser } from '../../redux/featchers/userSlice';
import { TOKEN_NAME, RESTAURNAT_ID } from '../../services/servise';

const Logout = () => {
    const dispatch = useDispatch();
    const nav = useNavigate()

    useEffect(() => {
        disconnected()
    }, [])
    const disconnected = async () => {
        localStorage.removeItem(TOKEN_NAME)
        localStorage.removeItem(RESTAURNAT_ID)

        dispatch(logoutUser())
        dispatch(logoutRestaurant())
        nav('/login')

    }
    return (
        <></>
    )
}

export default Logout