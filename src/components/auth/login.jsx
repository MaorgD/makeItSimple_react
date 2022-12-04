import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { ThreeDots } from 'react-loader-spinner'
import { useDispatch } from 'react-redux';
import { saveInfo } from '../../featchers/restaurantSlice';
import {
    API_URL, doApiMethodSignUpLogin,
    TOKEN_NAME, TOKEN_ROLE, TOKEN_ID, regEmail, regPassword, TOKEN_JOBS
} from '../../services/servise';
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const Login = () => {
    const dispatch = useDispatch();


    const [isSubmitted, setIsSubmitted] = useState(false)
    const nav = useNavigate()
    let { register, handleSubmit, getValues, formState: { errors } } = useForm();
    const onSub = (_dataBody) => {
        console.log(_dataBody);
        setIsSubmitted(true);
        doApi(_dataBody)
    }

    const doApi = async (_dataBody) => {
        try {
            const url = API_URL + '/users/login';
            const { data } = await doApiMethodSignUpLogin(url, "POST", _dataBody);
            console.log(data);
            if (data.token) {
                // localStorage.setItem(TOKEN_ROLE, data.userRole);
                localStorage.setItem(TOKEN_NAME, data.token);
                localStorage.setItem(TOKEN_NAME, data.token);
                // localStorage.setItem(TOKEN_ID, data.id);
                // localStorage.setItem(TOKEN_JOBS, data.jobs);

                let user = {
                    id: data.id,
                    userRole: data.userRole,
                    jobs: data.jobs,

                }
                dispatch(saveInfo({ userInfo: user }));

                console.log(data);
                if (data.jobs.includes("manager"))
                    nav("/myRestaurantList");
                else if (data.jobs.includes("chef"))
                    nav("/chef");

                else if (data.jobs.includes("waiter"))
                    nav("/waiter");

                if (!data.jobs)
                    nav("/");
            }

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
                                <input {...register('email', { required: true, pattern: regEmail })}
                                    id="email-address"
                                    name="email"
                                    type="text"
                                    autoComplete="email"
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"

                                />
                            </div>
                            {errors.email && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>Enter valid email</p>}

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input {...register('password', { required: { value: true, pattern: regPassword, message: 'password is requried' }, minLength: { value: 6, message: "password! Between 6-16 chars Must contain 1 letter and 1 sign." } })}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className={classNames(errors.password ? "relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        :
                                        "relative block w-full appearance-none  rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
                                    placeholder="Password"
                                />
                            </div>
                            {errors.password && errors.password.type == 'required' && <p className='text-white font-bold bg-red-800 text-center  rounded-b-md border-gray-300  py-1'>{errors?.password?.message}</p>}
                            {errors.password && errors.password.type == 'minLength' && <p className='text-white font-bold bg-red-800 text-center  rounded-b-md  border-gray-300  py-1'>{errors?.password?.message}</p>}
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
                                <div className="text-sm">
                                    <Link to={'/requestResetPass'} className="font-medium text-indigo-600 hover:text-indigo-500">
                                        Forgot your password?
                                    </Link>
                                </div>
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

export default Login