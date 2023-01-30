import React from 'react'
import { useDrop } from 'react-dnd';

const DropItems = ({setOrderItems}) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: 'card',
    drop: (item) => 
    
    {setOrderItems((prev)=>[...prev,item])
      // props.handleDrop(item,shift.id) ;
       return { added: item }
      }
    ,
    collect: (monitor) => ({
        isOver: monitor.isOver()
    })
})
  return (
    <div ref={dropRef}
     className='w-full border-4 border-dashed h-1/4 text-center'>
drop here
    </div>
  )
}

export default DropItems