import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux';
import { saveInfo } from '../../featchers/restaurantSlice';
import { API_URL, regEmail, doApiMethod} from '../../services/servise';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const RequestResetPass = () => {
    let { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate()
    const [isSubmitted, setIsSubmitted] = useState(false)
    
    const onSub = (_dataBody) => {
        // console.log(_dataBody);
        setIsSubmitted(true);
        doApi(_dataBody)
    }

    const doApi = async (_dataBody) => {
        try {
            const url = API_URL + '/users/requestPasswordReset';
            const { data } = await doApiMethod(url, "POST", _dataBody);
            alert(data)
            nav("/")
        }
        catch (err) {

            setIsSubmitted(false);
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
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                start your 14-day free trial
                            </a>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input {...register('email', { required: true, minLength: 2, maxLength: 35, pattern: regEmail })}
                                    id="email-address"
                                    name="email"
                                    type="text"
                                    autoComplete="email"
                                    className={classNames(errors.email ? "relative block w-full appearance-none rounded-t-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        :
                                        "relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
                                    placeholder="Email address"

                                />
                            </div>
                            {errors.email && <p className='text-white font-bold bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>Enter valid email</p>}

                        </div>
                        {!isSubmitted ?
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Send to email
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
                    </form>
                </div>
            </div>
        </>
    )
}

export default RequestResetPass