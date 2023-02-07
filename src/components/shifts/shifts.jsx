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
    const [isEditShifts, setIsEditShifts] = useState(false);
    const [shifts, setShifts] = useState([]);
    const selectWorkerRef = useRef();
    useEffect(() => {
        if (restaurant?.shifts)
            setShifts(restaurant.shifts)
    }, [restaurant]);

const onClickSave=()=>{
    doApi(eventsData)
}
const doApi = async (_shifts) => {
    try {
        const url = API_URL + '/restaurants/setShifts/' + localStorage.getItem(RESTAURNAT_ID);
        const data = await doApiMethodTokenNotStringify(url, "PATCH", _shifts);
        if (data) {
            window.location.reload(false);
    }
    }
    catch (err) {
                        // לשנות קונסול
        console.log(err);
    }
};
    return (
        <>
            <div className=" min-h-full items-center justify-center py-12 ">
                <div className=''>
                    {user?.data?.worker?.jobs.includes("manager") && <div className='flex-col space-y-3  mb-3 text-center'>

                        <Link className='bg-indigo-400 rounded-full p-2  mr-1' to={"/manager/workers"} >Check workers list </Link>
                        <button
                            className='bg-indigo-400 rounded-full p-2  ml-1'
                            onClick={() => {
                                if (isEditShifts)
                                    setIsEditShifts(false)
                                else
                                    setIsEditShifts(true)
                            }}>Edit shifts</button>

                        {isEditShifts &&
                            <div >
                                <select ref={selectWorkerRef} name="employees" id="employees"
                                className='m-1'
                                >
                                    <option key={"select worker"} value={null}>Select worker</option>
                                    {restaurant?.workersArray.map((employee) => (<option key={employee._id} id={employee._id} value={employee._id}>{employee.fullName.firstName} {employee.fullName.lastName} </option>))}
                                </select>
                                <button className="border rounded-lg p-1 m-1 bg-lime-400 " 
                        onClick={()=>{onClickSave()}} >Save</button>

                            </div>
                        }


                    </div>}

                    <ShiftCalendar employees={restaurant?.workersArray} isEditShifts={isEditShifts} selectWorkerRef={selectWorkerRef} shifts={shifts} eventsData={eventsData} setEventsData={setEventsData} />
                </div>

            </div>
        </>
    )
}

export default Shifts
