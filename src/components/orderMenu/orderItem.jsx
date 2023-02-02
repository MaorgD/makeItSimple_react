import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const OrderItem = ({ item ,setOrderItems}) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const removeItem=()=>{
    setOrderItems((prev)=>{
     
      // console.log(item._id);
      console.log(prev);
      // console.log( );
      return prev.filter((it) => it._id!=item._id)
      
    })
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
        
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant={"body2"} sx={{ width: '33%', flexShrink: 0 ,marginRight:1 }}>
          {item.name}
          </Typography>
          <Typography variant={"caption"} sx={{ color: 'text.secondary',marginLeft:2 }}>{item.category}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {item.price}

          </Typography>
          <button onClick={removeItem}>remove </button>
        </AccordionDetails>
      </Accordion>
     
    </div>
  )
}

export default OrderItem