import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { ThreeDots } from 'react-loader-spinner'


import {
    API_URL, doApiMethodFillDetales,
    TOKEN_NAME, TOKEN_ROLE, TOKEN_ID, regEmail, regPassword, TOKEN_JOBS, regPhone
} from '../../services/servise';

const WorkerFill = () => {

    const [fillDetales, setfillDetales] = useState(false)
    const nav = useNavigate()
    let { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const onSub = (_dataBody) => {
        console.log(_dataBody);
        setfillDetales(true);
        doApi(_dataBody)
    }

    const doApi = async (_dataBody) => {
        try {
            const url = API_URL + '/users/worker/:';
            const { data } = await doApiMethodFillDetales(url, "PATCH", _dataBody);
            console.log(data);
            if (data.token) {
                localStorage.setItem(TOKEN_ROLE, data.userRole);
                localStorage.setItem(TOKEN_NAME, data.token);
                localStorage.setItem(TOKEN_ID, data.id);
                localStorage.setItem(TOKEN_JOBS, data.jobs);
                console.log(data);
                if (data.jobs.includes("waiter"))
                    nav("/waiter")
                if (data.jobs.includes("chef"))
                    nav("/chef")
                if (!data.jobs)
                    nav("/");
            }

        }
        catch (err) {

            setfillDetales(false);
            alert(err.response.data.msg);
        }
    }
    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                          Fill yours detales
                        </h2>
                        {/* <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                start your 14-day free trial
                            </a>
                        </p> */}
                    </div>
                    <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="First-name" className="sr-only">
                                    First name 
                                </label>
                                <input {...register('First name', { required: true, minLength: 2, maxLength: 20 })}
                                    id="First-name"
                                    name="First-name"
                                    type="text"
                                    autoComplete="First name"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="First name"
                                />
                            </div>
                            <div>
                                <label htmlFor="Last-name" className="sr-only">
                                    Last name 
                                </label>
                                <input {...register('Last name', { required: true, minLength: 2, maxLength: 20 })}
                                    id="Last-name"
                                    name="Last-name"
                                    type="text"
                                    autoComplete="Last name"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Last name"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone-number" className="sr-only">
                                phone number
                                </label>
                                <input {...register('phone', { required: true, minLength: 9, maxLength: 10, pattern:regPhone })}
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    autoComplete="phone"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="phone number"

                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input {...register('password', { required: true, minLength: 2, maxLength: 25, pattern: regPassword })}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    confirm Password
                                </label>
                                <input {...register('password', { required: true, minLength: 2, maxLength: 25, pattern: regPassword })}
                                    id="password"
                                    name="password2"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="confirm Password "
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>

                            {!fillDetales ?
                                <button
                                    type="submit"
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                    </span>
                                    Sign in
                                </button>
                                :
                                <ThreeDots
                                    height="80"
                                    width="80"
                                    radius="9"
                                    color="blue"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="flex justify-center"
                                    visible={true}
                                />

                            }

                        </div>
                    </form>
                </div>
            </div>
        </>

    )
}

export default WorkerFill