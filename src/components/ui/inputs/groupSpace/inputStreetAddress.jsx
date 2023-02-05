import React from 'react'

const InputStreetAddress = (props) => {
    const errors = props.errors
    const register = props.register
    const label = props.label
    const classNameStyle = props.classNameStyle
    const labelStyle = props.labelStyle ? props.labelStyle : "block text-sm font-medium text-gray-700"
    const defaultValue = props.defaultValue

    return (
        <>
            <div className="col-span-6">
                <label className={labelStyle}>
                    {label}
                </label>
                <input defaultValue={defaultValue} {...register('address[Street]', {
                    required: { value: true, message: 'Street is requried' },
                    minLength: { value: 1, message: "Street num must be at least 1 characters" },
                    maxLength: { value: 20, message: "Street num cant be no more 20 characters" }
                })}
                    type="text"
                    id='Street'
                    name="address[Street]"

                    className={classNameStyle}
                />
                {errors?.address && errors.address?.Street?.type === 'minLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.address.Street?.message}</div>}
                {errors?.address && errors.address?.Street?.type === 'maxLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.address.Street?.message}</div>}
                {errors?.address && errors.address?.Street?.type === 'required' && <div className='text-white font-bold bg-red-800 text-center rounded-b-md border-gray-300  py-1'>{errors?.address.Street?.message}</div>}

            </div>

        </>
    )
}

export default InputStreetAddress