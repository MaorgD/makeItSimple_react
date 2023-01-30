import React from 'react'
import { useDrop } from 'react-dnd';

const DropItems = () => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'card',
    drop: (item) => 
    
    {
      // props.handleDrop(item,shift.id) ;
      //  return { added: item }
      }
    ,
    collect: (monitor) => ({
        isOver: monitor.isOver()
    })
})
  return (
    <div className='w-full border-4 border-dashed h-1/4 text-center'>
drop here
    </div>
  )
}

export default DropItems