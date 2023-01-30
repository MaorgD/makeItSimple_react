import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../helpers/getMenuCategories';
import OrderMenuSlider from '../ui/slider/orderMenuSlider';


const MenuOrderNav = (props) => {
  const { restaurant } = useSelector((state) => state.restaurantSlice);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [subCategories, setsubCategories] = useState([]);
  const [itesmOfCat, setItesmOfCat] = useState([]);
  const [selecteCat, setSelecteCat] = useState("");
  const [isSelecte, setIsSelecte] = useState(false);


  useEffect(() => {
    if (restaurant)
    console.log(restaurant)
      setCategories(getAllCategories(restaurant))

  }, [restaurant])
  console.log(categories)

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

  };
  
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

  };

  return (
    <>
      {isSelecte&&itesmOfCat && <OrderMenuSlider key={"ItemInMenu"} arr={itesmOfCat}  typ={"ItemInMenu"} />}
      {subCategories && <OrderMenuSlider arr={subCategories} setFunc={setMenuItemByCat} typ={"SubCategoryInMenu"} />}
      {categories && <OrderMenuSlider arr={categories} setFunc={setMenuItem} typ={"CategoryInMenu"} />}

      
    </>
    
  )
}

export default MenuOrderNav