import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import ShiftTable from './shiftTable';
import { useSelector, useDispatch } from 'react-redux';
import ShiftControl from './shiftControl';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { WorkerBox } from './workerBox'
import { ShiftCalendar } from './shiftCalendar';
import { API_URL, doApiMethodTokenNotStringify, RESTAURNAT_ID } from '../../services/servise';

const Shifts = () => {
    const { restaurant } = useSelector((state) => state.restaurantSlice);
    const { user } = useSelector((state) => state.userSlice);
    const [eventsData, setEventsData] = useState([]);

    // const today = new Date();
    // const [days, setDays] = useState(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
    // const [typeShifts, setTypeShifts] = useState([{ type: 'Morning', hours: "10:00-13:00" }, { type: 'Noon', hours: "13:00-16:00" }, { type: 'Afternoon', hours: "16:00-19:00" }, { type: 'Evening', hours: "19:00-23:00" }])
    const [isEditShifts, setIsEditShifts] = useState(false);
    const [shifts, setShifts] = useState([]);
    const selectWorkerRef = useRef();
    useEffect(() => {
        if (restaurant?.shifts)
            setShifts(restaurant.shifts)
        // console.log(restaurant.shifts)
    }, [restaurant]);

    // const handleDragStart = (event, employeeId) => {
    //     event.dataTransfer.setData('employeeId', employeeId);
    // };
    // const detectDeviceType = () =>
    // /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    //   ? 'Mobile'
    //   : 'Desktop';
const onClickSave=()=>{
    doApi(eventsData)
}
const doApi = async (_shifts) => {
    try {
        // console.log(_shifts);

        const url = API_URL + '/restaurants/setShifts/' + localStorage.getItem(RESTAURNAT_ID);
        const data = await doApiMethodTokenNotStringify(url, "PATCH", _shifts);
        if (data) {
            window.location.reload(false);
            // console.log(data);
    }
    }
    catch (err) {
        // setIsSubmitted(false);
        console.log(err);
    }
};
    return (
        <>
            <div className=" min-h-full items-center justify-center py-12 ">
                <div className=''>
                    {user?.data?.worker?.jobs.includes("manager") && <div className='flex-col space-y-3  mb-3 text-center'>

                        <Link className='bg-indigo-400 rounded-full p-1  mr-1' to={"/manager/workers"} >check workers list </Link>
                        <button
                            className='bg-indigo-400 rounded-full p-1  ml-1'
                            onClick={() => {
                                if (isEditShifts)
                                    setIsEditShifts(false)
                                else
                                    setIsEditShifts(true)
                            }}>edit shifts</button>

                        {isEditShifts &&
                            <div >
                                <select ref={selectWorkerRef} name="employees" id="employees"
                                className='m-1'
                                >
                                    <option key={"select worker"} value={null}>select worker</option>
                                    {restaurant?.workersArray.map((employee) => (<option key={employee._id} id={employee._id} value={employee._id}>{employee.fullName.firstName} {employee.fullName.lastName} </option>))}
                                </select>
                                <button className="border rounded-lg p-1 m-1 bg-lime-400 " 
                        onClick={()=>{onClickSave()}} >save</button>

                            </div>
                        }


                    </div>}

                    <ShiftCalendar employees={restaurant?.workersArray} isEditShifts={isEditShifts} selectWorkerRef={selectWorkerRef} shifts={shifts} eventsData={eventsData} setEventsData={setEventsData} />
                    {/* <DndProvider backend={detectDeviceType() == 'Mobile' ? TouchBackend : HTML5Backend}>
                        <div className="" >
                            <ShiftTable days={days} typeShifts={typeShifts} shifts={restaurant?.shifts} workers={restaurant?.workersArray} isEditShifts={isEditShifts} />
                        </div>
                            {user?.data?.worker?.jobs.includes("manager") && isEditShifts &&
                                <div className='border-2 p-1 '>
                                    {restaurant?.workersArray?.map((employee) => {
                                        if (employee.active) {
                                            return <WorkerBox draggable key={employee._id} employee={employee} />

                                        }
                                    })}
                                </div>}
                        
                    </DndProvider> */}




                </div>

            </div>
        </>
    )
}

export default Shifts
