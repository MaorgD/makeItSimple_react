import React from 'react'
import { useRef } from 'react'


const SelectCountrySpaced = (props) => {
    const register = props.register
    const label = props.label
    const setSelectedCountry = props.setSelectedCountry
    const countries = props.countries
    const ref = props.ref


    const countryRef = useRef();
   
    return (
        <>
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    {label}
                </label>

                <select ref={ref} onChange={() => { setSelectedCountry(countryRef.current.value); }}
                    {...register('address[country]',
                        { required: true })}
                    id="country"
                    name="address[country]"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >;
                    <option value={"Israel"} key={0} className="capitalize">Israel </option>

                    {countries
                        ?.filter((country) => country !== "Israel")
                        .map((country, i) => (

                            <option value={country} key={i + 1} className="capitalize">
                                {country}
                            </option>


                        ))}


                </select>
            </div>


        </>
    )
}

export default SelectCountrySpaced