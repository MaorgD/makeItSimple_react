import React from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const InputCalories = (props) => {
    const register = props.register
    const defaultValue = props.defaultValue



    return (
        <>

            <div className="col-span-6 sm:col-span-2">
                <label  htmlFor='calories' className="block text-sm font-medium text-gray-700">Calories</label>
                <input  defaultValue={defaultValue} 
                 {...register('calories', { required: { value: false } })}
                    type="number"
                    name="calories"
                    id="calories"
                    className="relative block w-full appearance-none  rounded-md border border-gray-300
                     px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 
                     focus:outline-none focus:ring-indigo-500 sm:text-sm" />

            </div>
        </>
    )
}

export default InputCalories