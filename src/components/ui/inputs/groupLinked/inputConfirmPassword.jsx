import React from 'react'

const InputConfirmPassword = (props) => {
    const errors = props.errors
    const register = props.register
    const label = props.label
    const className = props.className
    const getValues = props.getValues

       

    return (
        <>
            <div>
                <label htmlFor="password" className="sr-only">
                    {label}
                </label>
                <input {...register('confirmPassword', { required: true, validate: (value) => { return value == getValues('password') } })}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="current-confirmPassword" 
                    className={className}
                     placeholder="Confirm password"
                />

                {errors.confirmPassword && <p className='text-white font-bold bg-red-800 text-center  border-gray-300  py-1  rounded-b-md'>Passwords not match!</p>}
            </div>
        </>
    )
}

export default InputConfirmPassword


























