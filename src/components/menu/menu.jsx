import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import ItemMenu from './itemMenu';
import { onClickAddItem } from '../../redux/featchers/toggleSlice'
import MySlider from "../ui/slider/mySlider"
import { getAllCategories } from '../../helpers/getMenuCategories';

const Menu = (props) => {
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
    }

  }
  const openAddItem = () => {
    dispatch(onClickAddItem())
  }


  return (
    <>
      <div className="bg-white">
        <div className=" mx-auto max-w-2xl px-4 sm:py-2 sm:px-6 lg:max-w-7xl lg:px-8 justify-center">
          <div className=' mb-3 flex justify-center'>
            {user?.data?.worker?.jobs.includes("manager")&&!props?.fromTable
              &&
              <button onClick={() => { openAddItem() }}
                className="mt-5 rounded-full border mr-4 border-transparent bg-indigo-400 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">

                Add item to Menu
              </button>
            }
          </div>

          <div className='mb-2'>

            {categories && <MySlider arr={categories} setFunc={setMenuItem} typ={"CategoryInMenu"} />}
          </div>

          <div className='mb-4'>

            {subCategories && <MySlider arr={subCategories} setFunc={setMenuItemByCat} typ={"SubCategoryInMenu"} />}
          </div>

          {<div className="grid grid-cols-1 gap-y-10 gap-x-6  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8">
            {
              isSelecte && itesmOfCat.map((item) => (
                <ItemMenu key={item._id} fromTable={props?.fromTable} orderID={props?.orderID} item={item} />
              ))}

          </div>}


        </div>
      </div>


    </>
  )
}

export default Menu