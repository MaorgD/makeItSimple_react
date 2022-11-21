import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid'

import {
    API_URL, doApiMethodSignUpLogin,
    regEmail, regPassword, regPhone
} from '../../services/servise';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const SignUp = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const nav = useNavigate();
    let { register, handleSubmit, getValues, formState: { errors } } = useForm();

    const onSub = (_dataBody) => {
        delete _dataBody.password2
        setIsSubmitted(true);
        doApi(_dataBody)
    }

    const doApi = async (_dataBody) => {
        try {
            const url = API_URL + '/users/manager';
            const { data } = await doApiMethodSignUpLogin(url, "POST", _dataBody);
            console.log(data);
            if (data.email) {
                nav(`/verification/${data.fullName.firstName}`)
            }
        } catch (err) {
            console.log(err.response);
            alert(err.response.data.msg || err.response.data[0].message)
            setIsSubmitted(false);
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
                            Sign up
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />

                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="firstName" className="sr-only">
                                    First Name
                                </label>
                                <input {...register('fullName[firstName]', { required: true, minLength: 2, maxLength: 35, })}
                                    id="FirstName"
                                    name="fullName[firstName]"
                                    type="text"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="First name" />
                            </div>
                            {errors.fullName && errors.fullName.firstName && <div className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>Enter valid first name! Between 2-20 chars.</div>}
                            <div>
                                <label htmlFor="lastName" className="sr-only">
                                    Last Name
                                </label>
                                <input {...register('fullName[lastName]', { required: true, minLength: 2, maxLength: 35, })}
                                    id=" LastName"
                                    name="fullName[lastName]"
                                    type="text"
                                    required
                                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Last name" />
                            </div>
                            {errors.fullName && errors.fullName.lastName && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>Enter valid last name! Between 2-20 chars.</p>}
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input {...register('email', { required: true, minLength: 2, maxLength: 35, pattern: regEmail })}
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address" />
                            </div>
                            {errors.email && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>Enter valid email</p>}
                            <div>
                                <label htmlFor="phone-number" className="sr-only">
                                    Phone number
                                </label>
                                <input {...register('phone', { required: true, pattern: regPhone })}
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    autoComplete="phone"
                                    required
                                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Phone number" />
                            </div>
                            {errors.phone && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>Enter valid phone.</p>}
                            <div>
                                <label htmlFor="pin" className="sr-only">
                                    Pin code
                                </label>
                                <input {...register('worker[pin]', { required: true, minLength: 4, maxLength: 4, })}
                                    id=" pin"
                                    name="worker[pin]"
                                    type="text"
                                    required
                                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="pin code" />
                            </div>
                            {errors.worker && errors.worker.pin && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>Enter valid pin.</p>}
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
                                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password" />
                            </div>
                            {errors.password && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>Enter valid password! Between 6-16 chars Must contain 1 letter and 1 sign. </p>}
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    confirm Password
                                </label>
                                <input {...register('password2', { required: true, validate: (value) => { return value == getValues('password') } })}
                                    id="confirmPassword"
                                    name="password2"
                                    type="password"
                                    autoComplete="current-confirmPassword"
                                    required
                                    className={classNames(errors.password2 ? "relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        :
                                        "relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")} placeholder="Confirm password"
                                />

                            </div>
                            {errors.password2 && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1  rounded-b-md'>passwords not match!</p>}

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

                            {!isSubmitted ?
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

export default SignUp