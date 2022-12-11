import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { ThreeDots } from 'react-loader-spinner'
import { API_URL, regEmail, doApiMethodTokenNotStringify, regPhone } from '../../services/servise';
import { getCountries, getCities } from '../../helpers/fillCountry'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const NewRestaurant = () => {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [selectedCountry, setSelectedCountry] = useState("Israel");
    const [selectedCity, setSelectedCity] = useState("Tel Aviv");
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const countryRef = useRef();
    const cityRef = useRef();

    useEffect(() => {
        getAllCountries()
        // console.log("Country")

    }, [cities])

    useEffect(() => {
        // console.log(selectedCountry)
        getAllCities(selectedCountry)

    }, [selectedCountry])

    const getAllCountries = async () => {
        let countries = await getCountries();
        let countriesName = await countries?.map((country) => country.country);
        // console.log(countriesName)
        setCountries(countriesName);
    }

    const getAllCities = async (_country) => {
        let Cities = await getCities(_country);
        // console.log(Cities)
        setCities(Cities);
    }
    const nav = useNavigate()
    let { register, handleSubmit, formState: { errors } } = useForm();
    const onSub = (_dataBody) => {
        // console.log(_dataBody);
        setIsSubmitted(true);
        doApi(_dataBody)
    }

    
// להוריד??????? את השורה הזו
    const onChangeSet = (_country) => {
        // console.log(_country);
        setSelectedCountry(_country)
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

    // console.log(errors)
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
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                        restaurant name
                                    </label>
                                    <input {...register('name', { required: { value: true, message: 'name is requried' }, minLength: { value: 2, message: "name must be at least 2 characters" } })}
                                        id="name"
                                        type="text"
                                        name="name"

                                        className={classNames(errors.name ? "relative block w-full appearance-none rounded-t-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            :
                                            "relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")}
                                    />

                                    {errors.name && errors.name.type === 'minLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.name?.message}</div>}
                                    {errors.name && errors.name.type === 'required' && <div className='text-white font-bold bg-red-800 text-center rounded-b-md border-gray-300  py-1'>{errors?.name?.message}</div>}
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700">
                                        phone
                                    </label>
                                    <input
                                        {...register('phone', { required: { value: true, message: 'phone is requried' }, pattern: regPhone, minLength: { value: 10, message: "phone must be at least 10 characters" }, maxLength: { value: 15, message: "phone cant be no more 15 characters" } })}
                                        type="text"
                                        name="phone"

                                        autoComplete="phone"
                                        className={classNames(errors.phone ? "relative block w-full appearance-none rounded-t-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            :
                                            "relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")} />
                                    {errors.phone && errors.phone.type === 'minLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.phone?.message}</div>}
                                    {errors.phone && errors.phone.type === 'required' && <div className='text-white font-bold bg-red-800 text-center rounded-b-md border-gray-300  py-1'>{errors?.phone?.message}</div>}
                                    {errors.phone && errors.phone.type === 'maxLength' && <div className='text-white font-bold bg-red-800 text-center rounded-b-md border-gray-300  py-1'>{errors?.phone?.message}</div>}
                                </div>

                                <div className="col-span-6" >
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <input {...register('email', { required: true, pattern: regEmail })}
                                        id="email-address"
                                        name="email"
                                        type="text"
                                        autoComplete="email"
                                        className={classNames(errors.email ? "relative block w-full appearance-none rounded-t-md  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            :
                                            "relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm")} />

                                    {errors.email && <p className='text-white font-bold bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>Enter valid email</p>}
                                </div>


                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                        Country
                                    </label>

                                    <select ref={countryRef} defaultValue={selectedCountry}
                                        onChange={() => {
                                            // console.log(countryRef.current)
                                            setSelectedCountry(countryRef.current.value)

                                        }}
                                        // {...register('address[country]',
                                        //     { required: true })}
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
                                        {/* <option className="capitalize">Select City</option> */}

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
                                    <input {...register('address[Street]', { required: { value: true, message: 'street is requried' }, minLength: { value: 2, message: "street charcter must be more then 2 must be at least 1 characters" }, maxLength: { value: 20, message: "street charcter cant be no more 20 characters" } })}
                                        type="text"
                                        name="address[Street]"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors.address && errors.address.Street.type === 'minLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.address.Street?.message}</div>}
                                    {errors.address && errors.address.Street.type === 'maxLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.address.Street?.message}</div>}
                                    {errors.address && errors.address.Street.type === 'required' && <div className='text-white font-bold bg-red-800 text-center rounded-b-md border-gray-300  py-1'>{errors?.address.Street?.message}</div>}

                                </div>



                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                        address numner
                                    </label>
                                    <input {...register('address[num]', { required: { value: true, message: 'street number is requried' }, minLength: { value: 1, message: "street number must be at least 1 number" }, maxLength: { value: 9999, message: "street number cant be no more 20 number" } })}
                                        name="address[num]"
                                        id="num"
                                        type="text"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors.address && errors.address.num.type === 'minLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.address.num?.message}</div>}

                                    {errors.address && errors.address.num.type === 'maxLength' && <div className='text-white font-bold text-sm bg-red-800 text-center rounded-b-md  border-gray-300  py-1'>{errors?.address.num?.message}</div>}

                                    {errors.address && errors.address.num.type === 'required' && <div className='text-white font-bold bg-red-800 text-center rounded-b-md border-gray-300  py-1'>{errors?.address.num?.message}</div>}

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