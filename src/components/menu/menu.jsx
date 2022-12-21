import React, { useEffect, useState } from 'react'
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { RESTAURNAT_ID } from '../../services/servise';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CategoryInMenu from './categoryInMenu';
import ItemMenu from './itemMenu';
import SubCategoryInMenu from './subCategoryInMenu';
import { onClickAddItem } from '../../redux/featchers/toggleSlice'
import MySlider from "../ui/slider/mySlider"
import { getAllCategories } from '../../helpers/getMenuCategories';


const Menu = () => {
  const { restaurant } = useSelector((state) => state.restaurantSlice);
  const { user } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [subCategories, setsubCategories] = useState([]);
  const [itesmOfCat, setItesmOfCat] = useState([]);
  const [isSelecte, setIsSelecte] = useState(false);
  const [selecteCat, setSelecteCat] = useState("");

  useEffect(() => {
    if (restaurant)
      setCategories(getAllCategories(restaurant))

  }, [restaurant])

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

  const setMenuItemByCat = (_subCategory) => {
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
  const openAddItem = () => {
    dispatch(onClickAddItem())
  }


  return (
    <>
      <div className="bg-white">
        <div className=" mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 justify-center">
          <div className=' mt-2  '>

            <h2 className=" text-center text-3xl font-bold tracking-tight text-gray-900">
              MENU :
            </h2>
            <div className='flex justify-end'>
              {user?.data?.worker?.jobs.includes("manager")
                &&
                <button onClick={() => { openAddItem() }}
                  className="rounded-full border mr-4 border-transparent bg-indigo-300 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">

                  Add item
                </button>
              }
            </div>
          </div>
          <div className='m-5'>

            {categories && <MySlider arr={categories} setFunc={setMenuItem} typ={"CategoryInMenu"} />}
          </div>

          <div className='m-5'>

            {subCategories && <MySlider arr={subCategories} setFunc={setMenuItemByCat} typ={"SubCategoryInMenu"} />}
          </div>

          {<div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {
              isSelecte && itesmOfCat.map((item) => (
                <ItemMenu key={item._id} item={item} />
              ))}

          </div>}


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