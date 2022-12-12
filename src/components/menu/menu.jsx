import React, { useEffect, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { API_URL, doApiTukenGet, RESTAURNAT_ID, TOKEN_JOBS } from '../../services/servise';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ItemMenu from './itemMenu';


const Menu = () => {


  
  // const nav = useNavigate()
  const { restaurant } = useSelector((state) => state.restaurantSlice);
  const { user } = useSelector((state) => state.userSlice);
  // console.log(restaurant.menu)
  const dispatch = useDispatch();
  const [ar, setAr] = useState([]);

  useEffect(() => {
    if (restaurant)
      console.log(restaurant)
    getMenu()
  }, [restaurant])

  const getMenu = async () => {
    if (localStorage.getItem(RESTAURNAT_ID)) {
      if (restaurant) {
        setAr(restaurant.menu)
      }
    }
  }

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            MENU :
          </h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

            {
              ar && ar.map((item) => (
                <ItemMenu key={item._id} item={item}/>
                ))}
          </div>
          {user?.data?.worker?.jobs.includes("manager") &&
            <Link to={"/addItemMenu"}
              className=" mt-5 group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-300 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <InformationCircleIcon className="h-4 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              Add new Item to menu
            </Link>
          }
        </div>
      </div>


    </>
  )
}
// const onClickAdd = () => {
//   localStorage.setItem(RESTAURNAT_ID, item._id)
//   // dispatch(getRestaurantInfo())
//   // nav(`/manager/menu/`)
// }


export default Menu