import React from 'react'

const SelectCitySpaced = (props) => {
    const label = props.label
    const setSelectedCity = props.setSelectedCity
    const cities = props.cities
    const ref = props.cityRef
    const classNameStyle = props.classNameStyle
    const labelStyle = props.labelStyle ? props.labelStyle : "block text-sm font-medium text-gray-700"
    const defaultValue = props.defaultValue

    return (
        <>
            <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                <label htmlFor="city" className={labelStyle}>
                    {label}
                </label>

                <select ref={ref} onChange={() => { setSelectedCity(ref.current.value) }}

                    id="city"
                    name="address[city]"
                    className={classNameStyle}
                >
                    {defaultValue && <option value={defaultValue} key={0} className="capitalize">
                        {defaultValue}
                    </option>}
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