import React, { useState, useEffect } from 'react';
// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const ShiftTable = (props) => {

    const isEditShifts = props.isEditShifts
    const employees = props.workers
    const days = props.days
    const typeShifts = props.typeShifts
    console.log(employees)
    const generate = (arrDays, arrTypeShifts,) => {
        let tempArr = [];
        let i = 1;
        arrDays.forEach(day => {
            arrTypeShifts.forEach(shiftType => {
                tempArr.push({ id: i++, day: day, type: shiftType.type, hours: shiftType.hours, employees: [] })
            })
        })
        setShifts(tempArr)

    };
    const [shifts, setShifts] = useState([]);

    useEffect(() => {
        generate(days, typeShifts)
    }, [days])
    useEffect(() => { console.log(shifts) }, [shifts])

    const handleDragStart = (event, employeeId) => {
        event.dataTransfer.setData('employeeId', employeeId);
    };

    const handleDrop = (event, shiftId) => {
        event.preventDefault();
        const employeeId = event.dataTransfer.getData('employeeId');
        const employee = employees.find((employee) => employee._id === employeeId);
        const shift = shifts.find((shift) => shift.id === shiftId);
        if (shift.employees.includes(employee)) {
            return
        } else {
            shift.employees.push(employee);
        }
        setShifts([...shifts]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const removeFromShift = (shift, employee) => {
        let inx = shift.employees.indexOf(employee)
        shift.employees.splice(inx, 1)
        setShifts([...shifts]);

    };
    return (
        <div >
            <table className='table-auto items-center mx-auto '>
                <thead className='border boder-2'>
                    <tr className="bg-gray-400" >
                        <th className="md:px-4 py-2"></th>
                        {shifts?.reduce((rows, shift) => {
                            if (!rows.includes(shift.day)) {
                                rows.push(shift.day);
                                return rows;
                            }
                            return rows;
                        }, []).map((row) => (
                            <th className="md:px-4 py-2 border" key={row}>{row}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {typeShifts?.reduce((rows, shiftType) => {

                        rows.push(shiftType);

                        return rows;
                    }, []).map((row) => (
                        <tr className="bg-white" key={row.type}>
                            <td className="border md:px-4 py-2">{row.type} {row.hours}</td>
                            {shifts
                                .filter((shift) => shift.type === row.type)
                                .map((shift) => (
                                    <td className="border md:px-4 py-2" key={shift.id} onDrop={(event) => handleDrop(event, shift.id)}
                                        onDragOver={handleDragOver}>
                                        <ul>
                                            {shift.employees.map((employee) => (
                                                <li className='flex ' key={employee._id}>{employee.fullName.firstName + " " + employee.fullName.lastName}
                                                   { isEditShifts&&<button onClick={() => {
                                                        removeFromShift(shift, employee)
                                                    }} >X</button>}</li>
                                            ))}
                                        </ul>

                                    </td>
                                ))}
                        </tr>
                    ))}
                </tbody>

            </table>
           
            
        </div>
    );
};

export default ShiftTable;
