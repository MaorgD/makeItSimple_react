import React, { useEffect, useState } from 'react'
import { detectDeviceType } from '../../helpers/checkDeviceType'
import DropItems from './dropItems'
import MenuOrderNav from './menuOrderNav'
import OrderDetailes from './orderDetailes'
import OrderItem from './orderItem'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd';
import { API_URL, doApiMethodToken, doApiMethodTokenNotStringify } from '../../services/servise'
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system'
const OrderMenu = ({ item, closeItem }) => {

  console.log(item)
  const [orderItems, setOrderItems] = useState([])

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const addItemsToOrder = () => {
    if (!orderItems) return
    let tmpArr = [];
    orderItems.map((item) => {
      tmpArr.push({ itemMenuId: item._id, note: "f" })
    })
    console.log(tmpArr)
    doApiAddToorder(tmpArr)

  };
  const doApiAddToorder = async (_orderItems) => {

    const url = `${API_URL}/orders/addItemsToOrder/${item.orderID._id}`;
    try {

      const data = await doApiMethodTokenNotStringify(url, "post", { items: _orderItems });
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

          <Button sx={{ marginY: 1 }} variant="contained" onClick={addItemsToOrder} endIcon={<SendIcon />}>
            Send
          </Button>
          <div>
            {
              orderItems && orderItems.map((item) => 
              (

                <OrderItem key={item.id} item={item}  setOrderItems={setOrderItems} />
              )
              )
            }
          </div>
           {item.orderID &&<Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography variant={"body2"} sx={{ width: '33%', flexShrink: 0, }}>
                  Order Items
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
               {item.orderID.orderItems.map((order)=>(<Box sx={{border:1}} key={order._id}>
                <Typography sx={{marginX:0.5}} variant={"caption"}>{order.itemMenuId.name}</Typography>
                <Typography sx={{marginX:0.5}} variant={"caption"}>{order.note}</Typography>
                <Typography sx={{marginX:0.5}} variant={"caption"}>{order.itemMenuId.price}</Typography>
               </Box>
               ))}

              </AccordionDetails>
            </Accordion>}
          <DropItems setOrderItems={setOrderItems} />
        </div>
        <MenuOrderNav />

      </DndProvider>

    </div>

  )
}

export default OrderMenu