import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import { useState } from 'react';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import {
    API_URL, doApiMethod, regPassword
} from '../../services/servise';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ResetPassword = () => {
    const params = useParams();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const nav = useNavigate();
    let { register, handleSubmit, getValues, formState: { errors } } = useForm();

    const onSub = (_dataBody) => {
        setIsSubmitted(true);
        console.log(_dataBody)
        delete _dataBody.password2
        doApi(_dataBody)
    }

    const doApi = async (_dataBody) => {

        try {
            if (params.userId && params.uniqueString) {
                _dataBody.userId = params.userId;
                _dataBody.uniqueString = params.uniqueString;
                console.log(_dataBody)

                const url = API_URL + '/users/resetPassword';
                const { data } = await doApiMethod(url, "POST", _dataBody);
                if (data) {
                    nav('/login')
                }
                console.log(data);
            }

        } catch (err) {
            console.log(err.response);
            alert(err.response.data.msg || err.response.data[0].message)
            setIsSubmitted(false);
        }
    }
    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6" action="#" method="POST">
                    <div className="-space-y-px rounded-md shadow-sm">

                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input {...register('newPassword', { required: { value: true, pattern: regPassword, message: 'password is requried' }, minLength: { value: 6, message: "password! Between 6-16 chars Must contain 1 letter and 1 sign." } })}
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                autoComplete="current-password"

                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password" />
                        </div>
                        {errors.newPassword && errors.newPassword.type == 'required' && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>{errors?.newPassword?.message}</p>}
                        {errors.newPassword && errors.newPassword.type == 'minLength' && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>{errors?.newPassword?.message}</p>}
                        <div>
                            <label htmlFor="password" className="sr-only">
                                confirm Password
                            </label>
                            <input {...register('confirmPassword', { required: true, validate: (value) => { return value == getValues('newPassword') } })}
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="current-confirmPassword"

                                className={classNames(errors.confirmPassword ? "relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    :
                                    "relative block w-full appearance-none  rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")} placeholder="Confirm password"
                            />

                        </div>
                        {errors.confirmPassword && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1  rounded-b-md'>passwords not match!</p>}
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

    )
}

export default ResetPassword