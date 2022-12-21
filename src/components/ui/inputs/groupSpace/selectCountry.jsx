import React from 'react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const SelectCountry = (props) => {
    const register = props.register
    const label = props.label
    const ref = props.ref
    const countries = props.countries
    const setSelectedCountry = props.setSelectedCountry




    return (
        <>
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    {label}
                </label>

                <select ref={ref} onChange={() => { setSelectedCountry(ref.current.value); }}
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

export default SelectCountry