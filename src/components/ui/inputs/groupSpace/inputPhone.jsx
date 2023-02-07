import React from 'react'
import { regPhone } from '../../../../services/servise';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const InputPhone = (props) => {
    const errors = props.errors
    const register = props.register
    const defaultValue = props.defaultValue
    const label = props.label
    const classNameStylePhone = props.classNameStylePhone



    return (
        <>
            <div className={classNameStylePhone}>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <input defaultValue={defaultValue}
                    {...register('phone', { required: { value: true, message: 'Phone is requried' }, pattern: regPhone, minLength: { value: 10, message: "Phone must be at least 10 characters" }, maxLength: { value: 15, message: "Phone cant be no more 15 characters" } })}
                    type="text"
                    name="phone"
                    id="phone"
                    className={classNames(errors.phone ? "relative block w-full appearance-none rounded-t-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        :
                        "relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")} />
                {errors.phone && errors.phone.type === 'minLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.phone?.message}</div>}
                {errors.phone && errors.phone.type === 'required' && <div className='text-white font-bold bg-red-800 text-center rounded-b-md border-gray-300  py-1'>{errors?.phone?.message}</div>}
                {errors.phone && errors.phone.type === 'maxLength' && <div className='text-white font-bold bg-red-800 text-center rounded-b-md border-gray-300  py-1'>{errors?.phone?.message}</div>}
            </div>





        </>
    )
}

export default InputPhone