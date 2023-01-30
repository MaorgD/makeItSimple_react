import React, { useEffect, useState } from 'react'
import { detectDeviceType } from '../../helpers/checkDeviceType'
import DropItems from './dropItems'
import MenuOrderNav from './menuOrderNav'
import OrderDetailes from './orderDetailes'
import OrderItem from './orderItem'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd';

const OrderMenu = ({ item, closeItem }) => {




  console.log(item)
  const [orderItems, setOrderItems] = useState([])
  return (
    <div className='flex  justify-between' >

      <DndProvider backend={detectDeviceType() == 'Mobile' ? TouchBackend : HTML5Backend}>

        <div className=' flex flex-col'>
      <button onClick={closeItem}>X</button>
          <OrderDetailes item={item} />
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