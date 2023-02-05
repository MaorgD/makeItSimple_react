import React from 'react'

const SelectCountrySpaced = (props) => {
    const label = props.label
    const setSelectedCountry = props.setSelectedCountry
    const countries = props.countries
    const Ref = props.countryRef
    const classNameStyle = props.classNameStyle
    const labelStyle = props.labelStyle ? props.labelStyle : "block text-sm font-medium text-gray-700"
    const defaultValue = props.defaultValue ? props.defaultValue : "Israel"


    return (
        <>
            <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className={labelStyle}>
                    {label}
                </label>

                <select ref={Ref} onChange={() => {

                    setSelectedCountry(Ref.current.value);
                }}

                    id="country"
                    name="address[country]"
                    className={classNameStyle}
                >;
                    <option value={defaultValue} key={0} className="capitalize">{defaultValue} </option>

                    {countries
                        ?.filter((country) => country !== defaultValue)
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