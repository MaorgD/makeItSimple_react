import React from 'react'
import { Link } from 'react-router-dom';
import ShiftTable from './shiftTable';
import { useSelector, useDispatch } from 'react-redux';

const Shifts = () => {
    const { restaurant } = useSelector((state) => state.restaurantSlice);

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <Link className='bg-indigo-400 rounded-full p-2 ' to={"/manager/workers"} >workers list </Link>
                </div>
                <ShiftTable workers={restaurant?.workersArray}/>
            </div>
        </>
    )
}

export default Shifts