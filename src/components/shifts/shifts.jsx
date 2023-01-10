import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import ShiftTable from './shiftTable';
import { useSelector, useDispatch } from 'react-redux';
import ShiftControl from './shiftControl';

const Shifts = () => {
    const { restaurant } = useSelector((state) => state.restaurantSlice);
    const { user } = useSelector((state) => state.userSlice);
    const [days, setDays] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    const [typeShifts, setTypeShifts] = useState([{ type: 'Morning', hours: "10:00-13:00" }, { type: 'Afternoon', hours: "13:00-17:00" }, { type: 'Evening', hours: "17:00-22:00" }])
    const [isEditShifts, setIsEditShifts] = useState(false);
    console.log(user)

    const handleDragStart = (event, employeeId) => {
        event.dataTransfer.setData('employeeId', employeeId);
    };

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className='flex-col mx-0'>
                    <div className='flex-col space-y-3  mb-3 text-center'>

                        <Link className='bg-indigo-400 rounded-full p-1  mr-1' to={"/manager/workers"} >check workers list </Link>
                        <button
                            className='bg-indigo-400 rounded-full p-1  ml-1'
                            onClick={() => {
                                if (isEditShifts)
                                    setIsEditShifts(false)
                                else
                                    setIsEditShifts(true)
                            }}>edit shifts</button>
                        {user?.data?.worker?.jobs.includes("manager") && isEditShifts && <div className=" flex justify-evenly mb-6 ">
                            <ShiftControl days={days} setDays={setDays} setTypeShifts={setTypeShifts} workers={restaurant?.workersArray} />

                        </div>}
                    </div>

                    <div className="" >
                        <ShiftTable days={days} typeShifts={typeShifts} workers={restaurant?.workersArray} isEditShifts={isEditShifts} />
                    </div>
                    {user?.data?.worker?.jobs.includes("manager") && isEditShifts && <div className='flex-col space-y-1'>
                        {restaurant?.workersArray?.map((employee) => {
                            if (employee.active) 
                            {
                                return <div className='border-2 border-indigo-300 rounded-lg text-center hover:bg-indigo-300 w-72 '
                                    key={employee._id}
                                    draggable
                                    onDragStart={(event) => handleDragStart(event, employee._id)}
                                >
                                    {employee.fullName.firstName + " " + employee.fullName.lastName}
                                </div>
                            }
                        })}
                    </div>}
                </div>

            </div>
        </>
    )
}

export default Shifts
