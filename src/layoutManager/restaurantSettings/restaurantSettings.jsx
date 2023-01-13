import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useForm } from 'react-hook-form'
import { ThreeDots } from 'react-loader-spinner'
import InputName from '../../components/ui/inputs/groupSpace/inputName'
import InputPhone from '../../components/ui/inputs/groupSpace/inputPhone'
import InputStreetAddress from '../../components/ui/inputs/groupSpace/inputStreetAddress'
import InputStreetNumber from '../../components/ui/inputs/groupSpace/inputStreetNumber'
import SelectCitySpaced from '../../components/ui/inputs/groupSpace/selectCitySpaced'
import SelectCountrySpaced from '../../components/ui/inputs/groupSpace/selectCountrySpaced'
import Gallery from './gallery'
import { getCities, getCountries } from '../../helpers/fillCountry';
import { API_URL, doApiMethodTokenNotStringify, RESTAURNAT_ID } from '../../services/servise';
import InputZone from '../../components/ui/inputs/groupSpace/inputZone';

const RestaurantSettings = () => {
  const { restaurant } = useSelector((state) => state.restaurantSlice);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isChangeAddress, setIsChangeAddress] = useState(false)
  const [isGallery, setIsGallery] = useState(false)
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Israel");
  const [selectedCity, setSelectedCity] = useState("");
  const [kitchenZone, setKitchenZone] = useState([]);
  const countryRef = useRef();
  const cityRef = useRef();

  useEffect(() => {
    getAllCountries()

  }, []);

  useEffect(() => {
    getAllCities(selectedCountry)

  }, [selectedCountry])
  useEffect(() => {
    if (restaurant)
      setKitchenZone(restaurant?.kitchenZone)

  }, [restaurant])


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
    if (isChangeAddress) {
      _dataBody.address.country = selectedCountry
      _dataBody.address.city = selectedCity
    }
    _dataBody.kitchenZone = kitchenZone;
    console.log(_dataBody)
    setIsSubmitted(true);
    doApiEditInfo(_dataBody)
  };

  const doApiEditInfo = async (_dataBody) => {

    let url = API_URL + '/restaurants/editRest/' + localStorage.getItem(RESTAURNAT_ID);
    try {
      const data = await doApiMethodTokenNotStringify(url, "PATCH", _dataBody);
      if (data) {
        window.location.reload(false);
      }
    }
    catch (err) {
      console.log(err);
    }

  };

  return (
    <div className="flex min-h-full items-center justify-center py-7 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div>

          <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
            Edit restaurant 
          </h2>
          <div className='flex justify-evenly my-3 '>

            <button
              className='border-2 rounded-full  bg-slate-300 p-2' onClick={() => {
                if (isChangeAddress)
                  setIsChangeAddress(false)
                else
                  setIsChangeAddress(true)
              }}>change addres</button>
            <button className='border-2 rounded-full  bg-slate-300 p-2' onClick={() => {
              if (isGallery)
                setIsGallery(false)
              else
                setIsGallery(true)
            }}>Gallery</button>
          </div>

        </div>
        {!isGallery && restaurant &&
          <form onSubmit={handleSubmit(onSub)} className="mt-3 space-y-5" action="#" method="POST">

            <div className="bg-white px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-6">

                <>
                  <InputName label={"Restaurant name"}
                    defaultValue={restaurant?.name}
                    register={register}
                    errors={errors} />

                  <InputPhone label={"Phone "}
                    defaultValue={restaurant?.phone}
                    register={register} errors={errors} />

                  <InputZone label={" zone "} kitchenZone={kitchenZone} setKitchenZone={setKitchenZone} />


                  <div className="col-span-6">
                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                      info                                    </label>
                    <input defaultValue={restaurant?.info}
                      {...register('info')}
                      type="text"
                      name="info"
                      id='info'
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                  </div>
                </>

                {isChangeAddress && restaurant?.address && <>
                  {countries &&
                    <SelectCountrySpaced label={"Country"} classNameStyle={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"} labelStyle={"sr-only"} register={register} setSelectedCountry={setSelectedCountry} countries={countries} countryRef={countryRef}
                      defaultValue={restaurant.address.country != '' ? restaurant.address.country : "select country"}
                    />
                  }


                  {cities && <SelectCitySpaced label={"City"} classNameStyle={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"} labelStyle={"sr-only"} register={register}
                    setSelectedCity={setSelectedCity} selectedCity={selectedCity} cities={cities} cityRef={cityRef}
                    defaultValue={restaurant.address.city != '' ? restaurant.address.city : "select city"}
                  />
                  }

                  <InputStreetAddress label={" Street address "} labelStyle={"sr-only"} classNameStyle={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"}
                    register={register}
                    errors={errors}
                    defaultValue={restaurant.address.Street != '' ? restaurant.address.Street : "street address ..."}
                  />

                  <InputStreetNumber label={"addres number"} classNameStyle={"relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"} labelStyle={"sr-only"} register={register} errors={errors}
                    defaultValue={restaurant.address.num != null ? restaurant.address.num : "street number ..."}
                  />
                </>
                }
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
                  Edit restaurant
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
        {/* gallery     gallry צריך לתקן  */}
        {isGallery && <Gallery images={restaurant?.gallry?.img} videos={restaurant?.gallry?.video} />}
      </div>
    </div>
  )
}

export default RestaurantSettings