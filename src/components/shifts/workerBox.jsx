import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../../services/servise';

export const WorkerBox = ({ employee }) => {
    const [{ isDragging }, dragRef] = useDrag({
        type: ItemTypes.CARD,
        item: employee,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    return (
        <div key={employee._id}  style={{backgroundColor:isDragging &&'rgb(165 180 252)'}} className='border-2 border-indigo-300 rounded-lg text-center hover:bg-indigo-300 w-72' ref={dragRef}>
            {employee.fullName.firstName + " " + employee.fullName.lastName}
            {isDragging && '😱'}
        </div>
    )
}