import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onClickHide, onClickHideTableInfo } from '../../redux/featchers/toggleSlice'
import { API_URL, doApiMethodTokenNotStringify, RESTAURNAT_ID } from '../../services/servise'
import PopUPModel from '../ui/popUpModel'
import Menu from '../menu/menu'
import OrderMenu from '../orderMenu/orderMenu'
const FullTableItem = (props) => {
    const { user } = useSelector((state) => state.userSlice);
    const dispatch = useDispatch()
    const item = props.item
    const closeItem = () => {
        dispatch(onClickHideTableInfo())
    }

    return (
        <PopUPModel>
<OrderMenu item={item} closeItem={closeItem} />
        
        </PopUPModel >
    )
}

export default FullTableItem