import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { API_URL, doApiMethodTokenNotStringify, jobs, RESTAURNAT_ID } from '../../services/servise';
import InputEmail from '../ui/inputs/groupSpace/inputEmail';
import SelectTypeJob from '../ui/inputs/groupSpace/selectTypeJob';

const AddWorker = () => {
    let { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [selectedJob, setSelectedJob] = useState([])


    const onSub = (_dataBody) => {
        setIsSubmitted(true);
        doApi(_dataBody)
    };

    const doApi = async (_dataBody) => {
        try {
            const url = API_URL + '/users/worker/' + localStorage.getItem(RESTAURNAT_ID);
            const data = await doApiMethodTokenNotStringify(url, "POST", _dataBody);
            nav("/manager/workers")
        }
        catch (err) {
            setIsSubmitted(false);
            alert(err.response.data.msg);
        }
    };
    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Send email to invaite your worker </h2>
                    </div>
                    <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6" action="#" method="POST">
                        <div className="-space-y-px rounded-md shadow-sm">

                            <InputEmail label={" Email address "} register={register} errors={errors} />
                        </div>
                        <div className="-space-y-px rounded-md shadow-sm">

                            <SelectTypeJob label={" Select type job "} register={register} setSelectedJob={setSelectedJob} selectedJob={selectedJob} classNameStyle="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
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

export default AddWorker