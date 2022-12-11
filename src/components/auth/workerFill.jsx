import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { ThreeDots } from 'react-loader-spinner'
import { API_URL, doApiMethodFillDetales, regPassword, regPhone } from '../../services/servise';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const WorkerFill = () => {
    const params = useParams();
    const [fillDetales, setfillDetales] = useState(false)
    const nav = useNavigate()
    let { register, handleSubmit, getValues, formState: { errors } } = useForm();

    const onSub = (_dataBody) => {
        // console.log(_dataBody);
        delete _dataBody.confirmPassword
        setfillDetales(true);
        doApi(_dataBody)
    }

    const doApi = async (_dataBody) => {
        const url = API_URL + '/users/worker/' + params.userId;
        try {
            const { data } = await doApiMethodFillDetales(url, "PATCH", _dataBody);
            console.log(data);
            if (data) {
                nav("/login")
            } else {
                alert(data)
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
                    </div>
                    <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="firstName" className="sr-only">
                                    First Name
                                </label>
                                <input {...register('fullName[firstName]', { required: { value: true, message: 'first name is requried' }, minLength: { value: 2, message: "first name must be at least 2 characters" } })}
                                    id="FirstName"
                                    name="fullName[firstName]"
                                    type="text"
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="First name" />
                            </div>
                            {errors.fullName && errors.fullName.firstName.type === 'minLength' && <div className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>{errors?.fullName.firstName?.message}</div>}
                            {errors.fullName && errors.fullName.firstName.type === 'required' && <div className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>{errors?.fullName.firstName?.message}</div>}

                            <div>
                                <label htmlFor="lastName" className="sr-only">
                                    Last Name
                                </label>
                                <input {...register('fullName[lastName]', { required: { value: true, message: 'last name is requried' }, minLength: { value: 2, message: "last name must be at least 2 characters" } })}
                                    id=" LastName"
                                    name="fullName[lastName]"
                                    type="text"
                                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Last name" />
                            </div>
                            {errors.fullName && errors.fullName.lastName.type === 'minLength' && <div className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>{errors?.fullName.lastName?.message}</div>}
                            {errors.fullName && errors.fullName.lastName.type === 'required' && <div className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>{errors?.fullName.lastName?.message}</div>}


                            <div>
                                <label htmlFor="phone-number" className="sr-only">
                                    Phone number
                                </label>
                                <input {...register('phone', { required: true, pattern: regPhone })}
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    autoComplete="phone"

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

                                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="pin code" />
                            </div>
                            {errors.worker && errors.worker.pin && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>Enter valid pin.</p>}

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input {...register('password', { required: { value: true, pattern: regPassword, message: 'password is requried' }, minLength: { value: 6, message: "password! Between 6-16 chars Must contain 1 letter and 1 sign." } })}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"

                                    className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password" />
                            </div>
                            {errors.password && errors.password.type === 'required' && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>{errors?.password?.message}</p>}
                            {errors.password && errors.password.type === 'minLength' && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>{errors?.password?.message}</p>}
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    confirm Password
                                </label>
                                <input {...register('confirmPassword', { required: true, validate: (value) => { return value === getValues('password') } })}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    autoComplete="current-confirmPassword"

                                    className={classNames(errors.confirmPassword ? "relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        :
                                        "relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")} placeholder="Confirm password"
                                />

                            </div>
                            {errors.confirmPassword && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1  rounded-b-md'>passwords not match!</p>}



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
                                    Update now
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