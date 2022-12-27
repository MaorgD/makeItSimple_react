import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { ThreeDots } from 'react-loader-spinner'
import { API_URL, doApiMethodFillDetales } from '../../services/servise';
import InputFirstName from '../ui/inputs/groupLinked/inputFirstName';
import InputLastName from '../ui/inputs/groupLinked/InputLastName';
import InputPinCode from '../ui/inputs/groupLinked/inputPinCode';
import InputPhoneLinked from '../ui/inputs/groupLinked/inputPhoneLinked';
import InputPasswordLinked from '../ui/inputs/groupLinked/inputPasswordLinked';
import InputConfirmPassword from '../ui/inputs/groupLinked/inputConfirmPassword';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const WorkerFill = () => {
    const params = useParams();
    const [fillDetales, setfillDetales] = useState(false)
    const nav = useNavigate()
    let { register, handleSubmit, getValues, formState: { errors } } = useForm();

    const onSub = (_dataBody) => {
        delete _dataBody.confirmPassword
        setfillDetales(true);
        doApi(_dataBody)
    }

    const doApi = async (_dataBody) => {
        const url = API_URL + '/users/worker/' + params.userId;
        try {
            const { data } = await doApiMethodFillDetales(url, "PATCH", _dataBody);
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

                            <InputFirstName
                                label={" First Name "}
                                register={register}
                                errors={errors}
                                className={"relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                            />

                            <InputLastName
                                label={" Last Name "}
                                register={register}
                                errors={errors}
                                className={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                            />

                            <InputPhoneLinked
                                label={" Phone "}
                                register={register}
                                errors={errors}
                                className={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                            />

                            <InputPinCode
                                label={" Phone "}
                                register={register}
                                errors={errors}
                                className={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                            />

                            <InputPasswordLinked
                                label={" Password "}
                                register={register}
                                errors={errors}
                                className={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                            />

                            <InputConfirmPassword
                                getValues={getValues}
                                label={"confirm Password"}
                                register={register}
                                errors={errors}
                                className={classNames(errors.confirmPassword ? "relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    :
                                    "relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
                            />



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