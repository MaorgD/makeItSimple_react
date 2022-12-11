import React, { useEffect, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/20/solid'

import { API_URL, doApiTukenGet } from '../../services/servise';
import Restaurant from './restaurant';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyRestaurantsList = () => {
    const userInfo = useSelector((state) => state.userSlice)
    const [ar, setAr] = useState([]);

    useEffect(() => {

        doApi()
    }, [])

    const doApi = async () => {
        console.log(userInfo)

        const url = API_URL + '/restaurants/myrestaurants/';
        try {
            let { data } = await doApiTukenGet(url);
            // console.log(data);
            setAr(data);
        }
        catch (err) {
            console.log(err)
            alert("there problem")
        }
    }

    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        {/* <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        /> */}
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            MY REATAURENTS :
                        </h2>
                        <div className="row g-3">
                            {ar.map(item => {
                                return (

                                    <Restaurant key={item._id} item={item} />
                                )
                            })}
                        </div>

                        <Link to={"/newrestaurant"}
                            className=" mt-5 group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-300 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <InformationCircleIcon className="h-4 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            Open new Restaurant
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyRestaurantsList