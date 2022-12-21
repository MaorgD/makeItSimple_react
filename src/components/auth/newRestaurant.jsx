import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { ThreeDots } from 'react-loader-spinner'
import { API_URL, regEmail, doApiMethodTokenNotStringify, regPhone } from '../../services/servise';
import { getCountries, getCities } from '../../helpers/fillCountry'
import InputName from '../ui/inputs/groupSpace/inputName';
import InputPhone from '../ui/inputs/groupSpace/inputPhone';
import InputEmail from '../ui/inputs/groupSpace/inputEmail';
import SelectCountry from '../ui/inputs/groupSpace/selectCountry';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const NewRestaurant = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState("Israel");
    const [selectedCity, setSelectedCity] = useState("");
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const countryRef = useRef();
    const cityRef = useRef();
    useEffect(() => {
        getAllCountries()
        console.log("Country")

    }, [cities])

    useEffect(() => {
        getAllCities(selectedCountry)
        console.log("selectedCountry")
    }, [selectedCountry])

    const getAllCountries = async () => {
        let countries = await getCountries();
        let countriesName = await countries?.map((country) => country.country);
        console.log(countriesName)
        setCountries(countriesName);
    }

    const getAllCities = async (_country) => {
        let Cities = await getCities(_country);
        setCities(Cities);
    }
    const nav = useNavigate()
    let { register, handleSubmit, formState: { errors } } = useForm();
    const onSub = (_dataBody) => {
        console.log(_dataBody);
        setIsSubmitted(true);
        doApi(_dataBody)
    }

    const doApi = async (_dataBody) => {
        try {
            const url = API_URL + '/restaurants/create';
            const { data } = await doApiMethodTokenNotStringify(url, "POST", _dataBody);
            console.log(data);
            if (data) {
                nav(`/manager`)
            }
        }
        catch (err) {
            setIsSubmitted(false);
            // console.log(err);
        }
    }
    return (
        <>
            <div className="flex min-h-full items-center justify-center py-7 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-6">
                    <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Srart your restaurant here !
                    </h2>
                    <form onSubmit={handleSubmit(onSub)} className="mt-3 space-y-5" action="#" method="POST">

                        <div className="bg-white px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-6 gap-6">
                            <InputName label={"Restaurant name"} register={register} errors={errors} />
                              
                                    <InputPhone label={"Phone "} register={register} errors={errors} />

                                    <InputEmail label={" Email address "} register={register} errors={errors} />

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Country
                                    </label>

                                    <select ref={countryRef} onChange={() => { setSelectedCountry(countryRef.current.value); }}
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

                                {/* <SelectCountry label={" Country "} register={register} errors={errors} ref={countryRef}
                                 setSelectedCountry={setSelectedCountry} countries={countries} /> */}


                                <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                        City
                                    </label>

                                    <select ref={cityRef} defaultValue={selectedCity} onChange={() => { setSelectedCity(cityRef.current.value) }}
                                        {...register('address[city]',
                                            {
                                                required: { value: true },
                                            })}
                                        id="city"
                                        name="address[city]"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    >
                                        <option className="capitalize">Select City</option>

                                        {cities?.map((city, i) => (
                                            <option value={city} key={i + 1} className="capitalize">
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-span-6">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Street address
                                    </label>
                                    <input {...register('address[Street]', { required: { value: true, message: 'street is requried' }, minLength: { value: 1, message: "street num must be at least 1 characters" }, maxLength: { value: 20, message: "street num cant be no more 20 characters" } })}
                                        type="text"
                                        id='Street'
                                        name="address[Street]"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors.address && errors.address.Street.type === 'minLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.address.Street?.message}</div>}
                                    {errors.address && errors.address.Street.type === 'maxLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.address.Street?.message}</div>}
                                    {errors.address && errors.address.Street.type === 'required' && <div className='text-white font-bold bg-red-800 text-center rounded-b-md border-gray-300  py-1'>{errors?.address.Street?.message}</div>}

                                </div>



                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                        ZIP / Postal code
                                    </label>
                                    <input {...register('address[num]', { required: true })}
                                        type="text"
                                        name="address[num]"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div className="col-span-6">
                                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                        info                                    </label>
                                    <input {...register('info', { required: true })}
                                        type="text"
                                        name="info"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>


                        <div>

                            {!isSubmitted ?
                                <button
                                    type="submit"
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                    </span>
                                    Create restaurant
                                </button>
                                :
                                <ThreeDots
                                    height="80"
                                    width="80"
                                    radius="9"
                                    color="blue"
                                    ariaLabel="three-dots-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="flex justify-center"
                                    visible={true}
                                />

                            }

                        </div>
                    </form>

                </div>
            </div>


        </>
    )
}

export default NewRestaurant