import React from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const InputInfo = (props) => {
    const register = props.register
    const defaultValue = props.defaultValue



    return (
        <>

            <div className="col-span-6 sm:col-span-4">
                <label className="block text-sm font-medium text-gray-700">Info</label>
                <div className="mt-1">
                    <textarea  defaultValue={defaultValue}  {...register('info', { required: { value: false } })}
                        id="info"
                        name="info"
                        height="30"
                        placeholder='Write details about the dish here.'

                        rows="3"
                        className=" resizeBlock mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
                </div>

            </div>
        </>
    )
}

export default InputInfo