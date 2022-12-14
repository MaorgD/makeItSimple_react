import React, { useEffect, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { RESTAURNAT_ID } from '../../services/servise';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CategoryInMenu from './categoryInMenu';
import ItemMenu from './itemMenu';
import SubCategoryInMenu from './subCategoryInMenu';


const Menu = () => {
  const { restaurant } = useSelector((state) => state.restaurantSlice);
  const { user } = useSelector((state) => state.userSlice);

  const [categories, setCategories] = useState([]);
  const [subCategories, setsubCategories] = useState([]);
  const [itesmOfCat, setItesmOfCat] = useState([]);
  const [isSelecte, setIsSelecte] = useState(false);
  const [selecteCat, setSelecteCat] = useState("");

  useEffect(() => {
    if (restaurant)
      getAllCategories()
  }, [restaurant])


  const getAllCategories = async () => {
    if (localStorage.getItem(RESTAURNAT_ID)) {
      if (restaurant) {
        let tempArr = [];
        restaurant.menu.map(item => {
          if (!tempArr.includes(item.category)) {

            tempArr.push(item.category)
          }
        })
        setCategories(tempArr)
      }
    }
  }

  const getAllSubCategories = async (_category) => {
    if (restaurant) {
      let tempsArr = []
      restaurant.menu.map((item) => {

        // console.log(item);
        if (item.category == _category) {
          if (!tempsArr.includes(item.subCategory)) {

            tempsArr.push(item.subCategory)
          }
        }
      })
      setsubCategories(tempsArr)
    }
  }

  const setMenuItem = (_category) => {
    if (restaurant) {
      let tempsArr = []
      restaurant.menu.map((item) => {
        if (item.category == _category) {
          tempsArr.push(item)
        }
      })
      setItesmOfCat(tempsArr)
      setIsSelecte(true)
      setSelecteCat(_category)
      getAllSubCategories(_category)
    }

  }

  const setMenuItemByCat = ( _subCategory) => {
    if (restaurant) {
      let tempsArr = []
      restaurant.menu.map((item) => {
        if (item.category == selecteCat) {
          if (item.subCategory == _subCategory) {
            tempsArr.push(item)
          }
        }
      })
      
      setItesmOfCat(tempsArr)
      setIsSelecte(true)
      // getAllSubCategories(_category)
    }

  }


  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            MENU :
          </h2>

          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 my-3">
            {
              categories && categories.map((item) => (
                <CategoryInMenu setMenuItem={setMenuItem} key={item} item={item} />
              ))}

          </div>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 my-3">
            {
              subCategories && subCategories.map((item) => (
                <SubCategoryInMenu setMenuItemByCat={setMenuItemByCat} key={item} item={item} />

              ))}

          </div>

          {<div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {
              isSelecte && itesmOfCat.map((item) => (
                <ItemMenu key={item._id} item={item} />
              ))}

          </div>}


        </div>
        {user?.data?.worker?.jobs.includes("manager") &&
          <Link to={"/addItemMenu"}
            className=" mt-5 group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-300 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <InformationCircleIcon className="h-4 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
            </span>
            Add new item to menu
          </Link>
        }
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