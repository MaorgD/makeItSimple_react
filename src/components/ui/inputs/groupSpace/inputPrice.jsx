import React from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const InputPrice = (props) => {
    const errors = props.errors
    const register = props.register
    const defaultValue = props.defaultValue


    return (
        <>
            <div className="col-span-6 sm:col-span-2">
                <label htmlFor='price' className="block text-sm font-medium text-gray-700">Price</label>
                <input
                 defaultValue={defaultValue} 
                  {...register('price', { required: { value: true, message: 'Price is requried' } })}
                    type="number"
                    name="price"
                    id="price"

                    className={classNames(errors.name ? "relative block w-full appearance-none rounded-t-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        :
                        "relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
                />

                {errors.price && errors.price.type === 'required' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.price?.message}</div>}
            </div>
        </>
    )
}

export default InputPrice