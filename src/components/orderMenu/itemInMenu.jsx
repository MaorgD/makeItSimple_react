import React from 'react'
import { useDrag } from 'react-dnd'

const ItemInMenu = ({item}) => {
console.log(item)
const [{ isDragging }, dragRef] = useDrag({
    type: 'card',
    item: item,
    collect: (monitor) => ({
        isDragging: monitor.isDragging()
    })
})
  
    return (
        <>

            <div ref={dragRef}
                key={item._id} className="  text-gray-700 border border-purple-400 mt-2 text-base
                rounded-full  text-center  hover:bg-purple-300 ml-3">
                <h3 className="m-1   ">
                {isDragging && '😱'}{item.name}</h3>
            </div>


        </>
    )
}
export default ItemInMenu