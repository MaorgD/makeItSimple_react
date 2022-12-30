import { LockClosedIcon } from '@heroicons/react/20/solid';
import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { getCities, getCountries } from '../../helpers/fillCountry';
import { API_URL, doApiMethodTokenPatch } from '../../services/servise';
import InputConfirmPassword from '../ui/inputs/groupLinked/inputConfirmPassword';
import InputFirstName from '../ui/inputs/groupLinked/inputFirstName';
import InputLastName from '../ui/inputs/groupLinked/InputLastName';
import InputPasswordLinked from '../ui/inputs/groupLinked/inputPasswordLinked';
import InputPhoneLinked from '../ui/inputs/groupLinked/inputPhoneLinked';
import InputPinCode from '../ui/inputs/groupLinked/inputPinCode';
import InputStreetAddress from '../ui/inputs/groupSpace/inputStreetAddress';
import InputStreetNumber from '../ui/inputs/groupSpace/inputStreetNumber';
import SelectCitySpaced from '../ui/inputs/groupSpace/selectCitySpaced';
import SelectCountrySpaced from '../ui/inputs/groupSpace/selectCountrySpaced';

const MyInfo = () => {

    const [myInfo, setMyInfo] = useState({})
    const { user } = useSelector((state) => state.userSlice)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isChangeAddress, setIsChangeAddress] = useState(false)
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("Israel");
    const [selectedCity, setSelectedCity] = useState("");
    const countryRef = useRef();
    const cityRef = useRef();

    useEffect(() => {
        getAllCountries()

    }, []);

    useEffect(() => {
        // console.log(selectedCountry)
        getAllCities(selectedCountry)

    }, [selectedCountry])

    const getAllCountries = async () => {
        let data = await getCountries();
        let countriesName = await data?.map((country) => country.country);
        setCountries(countriesName);
    };

    const getAllCities = async (_country) => {
        let data = await getCities(_country);
        setCities(data);
        setSelectedCity(data[0])

    };

    const onSub = (_dataBody) => {
        setIsSubmitted(true);
        // doApiEditInfo(_dataBody)
        if (isChangeAddress) {
            _dataBody.address.country = selectedCountry
            _dataBody.address.city = selectedCity
        }
        console.log(_dataBody)
    }

    const doApiEditInfo = async (_dataBody) => {
        if (user) {
            let url = API_URL + '/restaurants/myInfo/' + user.data._id;
            try {
                const data = await doApiMethodTokenPatch(url, "PATCH", _dataBody);
                if (data) {
                    window.location.reload(false);
                } else {
                    alert(data)
                }
            }
            catch (err) {
                alert(err.msg);
            }
        }
    };


    return (


        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>

                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        See yours detales
                    </h2>
                    <button onClick={() => { setIsChangeAddress(true) }}>change addres</button>
                </div>
                {user?.data && <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6" action="#" method="POST">
                    <div className="-space-y-px rounded-md shadow-sm">

                        <InputFirstName
                            label={" First Name "}
                            register={register}
                            errors={errors}
                            defaultValue={user.data.fullName.firstName}
                            className={"relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                        />

                        <InputLastName
                            label={" Last Name "}
                            register={register}
                            errors={errors}
                            defaultValue={user.data.fullName.lastName}
                            className={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                        />

                        <InputPhoneLinked
                            label={" Phone "}
                            register={register}
                            errors={errors}
                            defaultValue={user.data.phone}
                            className={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                        />

                        <InputPinCode
                            label={" Phone "}
                            register={register}
                            errors={errors}
                            defaultValue={user.data.worker.pin}
                            className={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                        />
                        {isChangeAddress && <>
                            {countries &&
                                <SelectCountrySpaced label={"Country"} classNameStyle={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"} labelStyle={"sr-only"} register={register} setSelectedCountry={setSelectedCountry} countries={countries} countryRef={countryRef}
                                    defaultValue={user.data.address.country != '' ? user.data.address.country : "select country"}
                                />
                            }


                            {cities && <SelectCitySpaced label={"City"} classNameStyle={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"} labelStyle={"sr-only"} register={register}
                                setSelectedCity={setSelectedCity} selectedCity={selectedCity} cities={cities} cityRef={cityRef}
                                defaultValue={user.data.address.city != '' ? user.data.address.city : "select city"}
                            />
                            }

                            <InputStreetAddress label={" Street address "} labelStyle={"sr-only"} classNameStyle={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                                register={register}
                                errors={errors}
                                defaultValue={user.data.address.Street != '' ? user.data.address.Street : "street address ..."}
                            />

                            <InputStreetNumber label={"addres number"} classNameStyle={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"} labelStyle={"sr-only"} register={register} errors={errors}
                                defaultValue={user.data.address.num != null ? user.data.address.num : "street number ..."}
                            />
                        </>
                        }

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
                                Update now
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
                </form>}
            </div>
        </div>
    )
}

export default MyInfo