import React, { useEffect, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/20/solid'

import { API_URL, doApiTukenGet } from '../../services/servise';
import Restaurant from './restaurant';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyRestaurantsList = () => {
    // משתמשים ביוזר פה??
    const { user } = useSelector((state) => state.userSlice)
    const [ar, setAr] = useState([]);
    const [isManager, setIsManager] = useState();

    useEffect(() => {

        doApi()
    }, [user])

    const doApi = async () => {
        if (user) {
            let url;
            if (user?.data?.worker?.jobs.includes("manager")){
                setIsManager(true)
                url = API_URL + '/restaurants/myrestaurants/';
            }
            else{
                setIsManager(false)

                url = API_URL + '/restaurants/myworks';
            }

            try {
                let  {data}  = await doApiTukenGet(url);
                setAr(data);
                // console.log(data)

            }
            catch (err) {
                // alert("there problem")
                console.log(err)
                
            }
        }
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-2 mb-6 text-center text-2xl font-bold tracking-tight text-purple-400">
                            MY REATAURENTS :
                        </h2>

                        
                        <div className="">
                            {ar && ar.map(item => {
                                return (

                                    <Restaurant key={item._id} item={item} jobs={user?.data?.worker?.jobs}/>
                                )
                            })}
                        </div>

                        {user?.data?.worker?.jobs.includes("manager") && <Link to={"/newrestaurant"}
                            className=" mt-5 group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-300 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <InformationCircleIcon className="h-4 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            Open new Restaurant
                        </Link>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyRestaurantsList