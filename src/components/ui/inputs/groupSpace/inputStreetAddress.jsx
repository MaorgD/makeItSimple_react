import React from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const InputStreetAddress = (props) => {
    const errors = props.errors
    const register = props.register
    const label = props.label

    return (
        <>
            <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                    {label}                </label>
                <input {...register('address[Street]', { required: { value: true, message: 'Street is requried' }, minLength: { value: 1, message: "Street num must be at least 1 characters" }, maxLength: { value: 20, message: "Street num cant be no more 20 characters" } })}
                    type="text"
                    id='Street'
                    name="address[Street]"
                    
                    className={classNames(errors?.address?.Street ? "relative block w-full appearance-none rounded-t-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    :
                    "relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
            />
                {errors.address && errors.address.Street.type === 'minLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.address.Street?.message}</div>}
                {errors.address && errors.address.Street.type === 'maxLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.address.Street?.message}</div>}
                {errors.address && errors.address.Street.type === 'required' && <div className='text-white font-bold bg-red-800 text-center rounded-b-md border-gray-300  py-1'>{errors?.address.Street?.message}</div>}

            </div>

        </>
    )
}

export default InputStreetAddress