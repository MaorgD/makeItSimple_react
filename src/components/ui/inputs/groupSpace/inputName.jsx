import React from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const InputName = (props) => {
    const errors = props.errors
    const register = props.register
    const defaultValue = props.defaultValue
    const label = props.label
    const classNameStyleDiv = props.classNameStyleDiv



    return (
        <>
            <div className={classNameStyleDiv}>
                <label htmlFor='name' className="block text-sm font-medium text-gray-700"> {label}</label>
                <input
                    defaultValue={defaultValue}
                    {...register('name', {
                        required: { value: true, message: 'Name is requried' },
                        minLength: { value: 2, message: "Name must be at least 2 characters" }
                    })}
                    type="text"
                    name="name"
                    id="name"
                    className={classNames(errors.name ? "relative block w-full appearance-none rounded-t-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        :
                        "relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
                />
                {errors.name && errors.name.type === 'minLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.name?.message}</div>}
                {errors.name && errors.name.type === 'required' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.name?.message}</div>}
            </div>





        </>
    )
}

export default InputName