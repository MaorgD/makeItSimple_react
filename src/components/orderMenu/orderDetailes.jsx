import React from 'react'
import { getTimeAgo } from "../../helpers/createTime"
import TableBarIcon from '@mui/icons-material/TableBar';
import ChairAltIcon from '@mui/icons-material/ChairAlt';
import PeopleIcon from '@mui/icons-material/People';
const OrderDetailes = ({item}) => {

  return (
    <div className=' border rounded-md p-1'>
<p> created :{getTimeAgo(item.createdAt)}</p>



<p><ChairAltIcon/> {item.seats}</p>
<p><PeopleIcon/> </p>
<p><TableBarIcon/>{item.tableNumber}</p>
<p>last updated:{getTimeAgo(item.updatedAt)}</p>
    </div>
  )
}

export default OrderDetailes