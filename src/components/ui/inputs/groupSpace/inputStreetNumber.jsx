import React from 'react'

const InputStreetNumber = (props) => {
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
                    {label}                </label>
                <input defaultValue={defaultValue} {...register('address[num]', { required: { value: true, message: 'street Number is requried' }, minLength: { value: 1, message: "street number must be at least 1 characters" }, maxLength: { value: 5, message: "street number cant be no more 5 characters" } })}
                    type="number"
                    id='num'
                    name="address[num]"

                    className={classNameStyle}
                />
                {errors?.address && errors.address?.num?.type === 'minLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.address.num?.message}</div>}
                {errors?.address && errors.address?.num?.type === 'maxLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.address.num?.message}</div>}
                {errors?.address && errors.address?.num?.type === 'required' && <div className='text-white font-bold bg-red-800 text-center rounded-b-md border-gray-300  py-1'>{errors?.address.num?.message}</div>}

            </div>

        </>
    )
}

export default InputStreetNumber