import React, { useEffect, useState } from 'react'
import { detectDeviceType } from '../../helpers/checkDeviceType'
import DropItems from './dropItems'
import MenuOrderNav from './menuOrderNav'
import OrderDetailes from './orderDetailes'
import OrderItem from './orderItem'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd';
import { API_URL, doApiMethodToken } from '../../services/servise'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const OrderMenu = ({ item, closeItem }) => {

  console.log(item)
  const [orderItems, setOrderItems] = useState([])

  const addItemsToOrder = () => {
    if (!orderItems) return
    console.log(orderItems)
    let tmpArr=[];
    orderItems.map((item) =>{
      tmpArr.push({itemMenuId:item._id,note:"f"})
    })
    console.log(tmpArr)
    doApiAddToorder(tmpArr)

  };
  const doApiAddToorder = async (_orderItems) => {

    const url = `${API_URL}/orders/addItemsToOrder/${item._id}`;
    try {

      const data = await doApiMethodToken(url, "post", {items:_orderItems});
      if (data) {

        // window.location.reload(false);

        console.log(data)
      } else {
        console.log(data)
      }
    }
    catch (err) {
      console.log(err);
    }
  };


  return (
    <div className='flex  justify-between' >

      <DndProvider backend={detectDeviceType() == 'Mobile' ? TouchBackend : HTML5Backend}>

        <div className=' flex flex-col'>
          <button onClick={closeItem}>X</button>
          <OrderDetailes item={item} />

          <Button sx={{marginY:1}} variant="contained" onClick={addItemsToOrder} endIcon={<SendIcon />}>
            Send
          </Button>
          <div>
            {
              orderItems && orderItems.map((item) => (

                <OrderItem key={item._id} item={item} />
              ))
            }
          </div>
          <DropItems setOrderItems={setOrderItems} />
        </div>
        <MenuOrderNav />

      </DndProvider>

    </div>

  )
}

export default OrderMenu