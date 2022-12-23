import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux';
import { saveInfo } from '../../redux/featchers/restaurantSlice';
import { API_URL, regEmail, doApiMethod } from '../../services/servise';
import InputEmail from '../ui/inputs/groupSpace/inputEmail';

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
                        {/* <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="Your Company"
                        /> */}
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Write here the email you want to send the confirmation to change your password                        </h2>
                        {/* <p className="mt-2 text-center text-sm text-gray-600">
                            Or{' '}
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                start your 14-day free trial
                            </a>
                        </p> */}
                    </div>
                    <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6" action="#" method="POST">
                        <div className="-space-y-px rounded-md shadow-sm">
                           
                                     <InputEmail label={" Email address "} register={register} errors={errors} />
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