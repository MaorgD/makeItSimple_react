import React, { useState } from 'react'
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../services/servise';

export const TdShift = (props) => {
  const isEditShifts = props.isEditShifts

    const shift=props.shift
    const [{ isOver }, dropRef] = useDrop({
        accept: ItemTypes.CARD,
        drop: (item) => {props.handleDrop(item,shift.id) ;
           return { added: item }}
        ,
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    })

    return (
        <React.Fragment>
            <td ref={dropRef} className="border md:px-4 py-2" key={shift.id}  >
                    <ul  key={shift.id}>
                      {shift.employees.map((employee ,i) => (
                        <li className='flex ' key={employee._id+i}>
                          {employee.fullName.firstName + " " + employee.fullName.lastName }
                           {isEditShifts&&<button onClick={() => {
                            props.removeFromShift(shift, employee)
                          }} > X</button>}</li>
                      ))}
                    </ul>

                  </td>
        </React.Fragment>
    )
}