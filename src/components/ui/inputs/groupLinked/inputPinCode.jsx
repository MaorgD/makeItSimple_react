import React from 'react'

const InputPinCode = (props) => {
    const errors = props.errors
    const register = props.register
    const label = props.label
    const className = props.className

    return (
        <>
            <div>
                <label htmlFor="pin" className="sr-only">
                    {label}                </label>
                <input {...register('worker[pin]', { required: true, minLength: 4, maxLength: 4, })}
                    id=" pin"
                    name="worker[pin]"
                    type="text"

                    className={className}
                    placeholder="Pin code" />
                {errors.worker && errors.worker.pin && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1'>Enter valid pin.</p>}
            </div>
        </>
    )
}
 
export default InputPinCode


























