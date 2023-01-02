import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { API_URL, doApiMethodTokenNotStringify, jobs, RESTAURNAT_ID } from '../../services/servise';
import InputEmail from '../ui/inputs/groupSpace/inputEmail';
import SelectTypeJob from '../ui/inputs/groupSpace/selectTypeJob';

const Shifts = () => {
    let { register, handleSubmit, formState: { errors } } = useForm();
    // const nav = useNavigate()
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [selectedJob, setSelectedJob] = useState([])


    const onSub = (_dataBody) => {
        console.log(_dataBody)
        setIsSubmitted(true);
        doApi(_dataBody)
    }

    const doApi = async (_dataBody) => {
        try {
            const url = API_URL + '/users/worker/' + localStorage.getItem(RESTAURNAT_ID);
            const data = await doApiMethodTokenNotStringify(url, "POST", _dataBody);
            // alert(data)
            // nav("/")
            console.log(data)
        }
        catch (err) {

            setIsSubmitted(false);
            // alert(err.response.data.msg);
            console.log(err)
        }
    }
    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <Link to={"/manager/workers"} >workers list </Link>
                </div>
            </div>
        </>
    )
}

export default Shifts