import React, { useState, useEffect } from 'react';
import { TdShift } from './tdShift'
const ShiftTable = (props) => {
    const shifts1 = props.shifts
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
        console.log(shifts)
       
        console.log(new Date(new Date().getFullYear(),new Date().getMonth() + 1, 0).getDate())
    }, [shifts])
    useEffect(() => {
        try {
            let obj = JSON.parse(shifts1);
            setShifts(obj);
        } catch (e) {
            generate(days, typeShifts)
            console.log("Invalid JSON : " + e);
        }
        console.log(shifts)
    }, [shifts1, days])

    // const handleDragStart = (event, employeeId) => {
    //     event.dataTransfer.setData('employeeId', employeeId);
    // };

    const handleDrop = (item, shiftId) => {
        // event.preventDefault();
        // const employeeId = event.dataTransfer.getData('employeeId');
        const employee = employees.find((employee) => employee._id === item._id);
        const shift = shifts.find((shift) => shift.id === shiftId);
        if (shift.employees.includes(employee)) {
            return
        } else {
            shift.employees.push(employee);
        }
        setShifts([...shifts]);
    };

    // const handleDragOver = (event) => {
    //     event.preventDefault();
    // };
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
                                .map((shift) => (<TdShift key={shift.id} shift={shift} handleDrop={handleDrop} removeFromShift={removeFromShift} isEditShifts={isEditShifts} />

                                ))}
                        </tr>
                    ))}
                </tbody>

            </table>


        </div>
    );
};

export default ShiftTable;
