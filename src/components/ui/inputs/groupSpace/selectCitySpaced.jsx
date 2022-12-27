import React from 'react'
import { useRef } from 'react'


const SelectCitySpaced = (props) => {
    const register = props.register
    const label = props.label
    const setSelectedCity = props.setSelectedCity
    const cities = props.cities
    const ref = props.ref
    const selectedCity = props.selectedCity


    const cityRef = useRef();

    return (
        <>
            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    {label}
                </label>

                <select ref={ref} onChange={() => { setSelectedCity(cityRef.current.value) }}
                    {...register('address[city]' )}
                    id="city"
                    name="address[city]"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    <option className="capitalize" value={"none"}>selecte City</option>

                    {cities?.map((city, i) => (
                        <option value={city} key={i + 1} className="capitalize">
                            {city}
                        </option>
                    ))}
                </select>
            </div>


        </>
    )
}

export default SelectCitySpaced