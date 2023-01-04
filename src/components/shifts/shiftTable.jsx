import React, { useRef, useState } from 'react';

const ShiftTable = (props) => {
   
    const employees = props.workers
    const [shifts, setShifts] = useState([
        { id: 1, day: 'Monday', type: 'Morning' },
        { id: 2, day: 'Monday', type: 'Afternoon' },
        { id: 3, day: 'Monday', type: 'Evening' },
        { id: 4, day: 'Tuesday', type: 'Morning' },
        { id: 5, day: 'Tuesday', type: 'Afternoon' },
        { id: 6, day: 'Tuesday', type: 'Evening' },
        { id: 7, day: 'Wednesday', type: 'Morning' },
        { id: 8, day: 'Wednesday', type: 'Afternoon' },
        { id: 9, day: 'Wednesday', type: 'Evening' },
        { id: 10, day: 'Thursday', type: 'Morning' },
        { id: 11, day: 'Thursday', type: 'Afternoon' },
        { id: 12, day: 'Thursday', type: 'Evening' },
        { id: 13, day: 'Friday', type: 'Morning' },
        { id: 14, day: 'Friday', type: 'Afternoon' },
        { id: 15, day: 'Friday', type: 'Evening' },
        { id: 16, day: 'Saturday', type: 'Morning' },
        { id: 17, day: 'Saturday', type: 'Afternoon' },
        { id: 18, day: 'Saturday', type: 'Evening' },
        { id: 19, day: 'Sunday', type: 'Morning' },
        { id: 20, day: 'Sunday', type: 'Afternoon' },
        { id: 21, day: 'Sunday', type: 'Evening' },
    ]);



    const handleDragStart = (event, employeeId) => {
        event.dataTransfer.setData('employeeId', employeeId);
    };

    const handleDrop = (event, shiftId) => {
        event.preventDefault();
        const employeeId = event.dataTransfer.getData('employeeId');
        console.log(employeeId);
        const employee = employees.find((employee) => employee._id === employeeId);
        console.log(employee)
        const shift = shifts.find((shift) => shift.id === shiftId);
        if (!shift.employees) {
            shift.employees = [employee];
        } else {
            shift.employees.push(employee);
        }
        setShifts([...shifts]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };
    console.log(employees)

    return (
        <div>
            <table className='table-auto text-center border  boder-2'>
                <thead className='border boder-2'>
                    <tr>
                        <th></th>
                        {shifts.reduce((rows, shift) => {
                            if (!rows.includes(shift.day)) {
                                rows.push(shift.day);
                                return rows;
                            }
                            return rows;
                        }, []).map((row) => (
                            <th className='border p-2' key={row}>{row}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {shifts.reduce((rows, shift) => {
                        if (!rows.includes(shift.type)) {
                            rows.push(shift.type);
                            return rows;
                        }
                        return rows;
                    }, []).map((row) => (
                        <tr  key={row}>
                            <td className='border p-2'>{row}</td>
                            {shifts
                                .filter((shift) => shift.type === row)
                                .map((shift) => (
                                    <td className='border p-2' key={shift.id}>
                                        {shift.employees ? (
                                            <ul
                                                onDrop={(event) => handleDrop(event, shift.id)}
                                                onDragOver={handleDragOver}
                                            >
                                                {shift.employees.map((employee) => (
                                                    <li key={employee._id}>{employee.fullName.firstName + " " + employee.fullName.lastName}</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div
                                                onDrop={(event) => handleDrop(event, shift.id)}
                                                onDragOver={handleDragOver}
                                                // onDragStart={(event) => handleDragStart(event, employee.id)}
                                                draggable
                                                className="employee-drag"
                                            >
                                                Drag  here
                                            </div>
                                        )}
                                    </td>
                                ))}
                        </tr>
                    ))}
                </tbody>

            </table>
            <div>
                {employees?.map((employee) => (
                    <div
                        key={employee._id}
                        draggable
                        onDragStart={(event) => handleDragStart(event, employee._id)}
                    >
                        {employee.fullName.firstName + " " + employee.fullName.lastName}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShiftTable;