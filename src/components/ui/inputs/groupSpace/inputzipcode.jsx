import React from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const InputZipCode = (props) => {
    const errors = props.errors
    const register = props.register
    const label = props.label


    return (
        <>
            <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                    {label}                </label>
                <input {...register('address[num]', { required: { value: true, message: 'Zip is requried' }, minLength: { value: 5, message: "Zip number must be at least 5 characters" }, maxLength: { value: 10, message: "Zip number cant be no more 10 characters" } })}
                    type="text"
                    id='num'
                    name="address[num]"

                    className={classNames(errors?.address?.num ? "relative block w-full appearance-none rounded-t-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    :
                    "relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
            />
                {errors.address && errors.address.num.type === 'minLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.address.num?.message}</div>}
                {errors.address && errors.address.num.type === 'maxLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.address.num?.message}</div>}
                {errors.address && errors.address.num.type === 'required' && <div className='text-white font-bold bg-red-800 text-center rounded-b-md border-gray-300  py-1'>{errors?.address.num?.message}</div>}

            </div>

        </>
    )
}

export default InputZipCode