import React from 'react'
import Slider from "react-slick";
import CategoryInMenu from '../../menu/categoryInMenu';
import SubCategoryInMenu from '../../menu/subCategoryInMenu';
import ItemInMenu from '../../orderMenu/itemInMenu';


const OrderMenuSlider = (props) => {
    const arr = props.arr
    console.log(arr)
    const settings = {
        infinite: false,
        speed: 800,
        slidesToShow: arr?.length,
        slidesToScroll: 4,
        initialSlide: 0,
        vertical: true,
        verticalSwiping: true,
  

        // responsive: [
        //     {
        //         breakpoint: 1024,
        //         settings: {
        //             slidesToShow: 3,
        //             slidesToScroll: 3,
        //         }
        //     },
        //     {
        //         breakpoint: 600,
        //         settings: {
        //             slidesToShow: 2,
        //             slidesToScroll: 2,
        //             initialSlide: 2,

        //         }
        //     },
        //     {
        //         breakpoint: 480,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1,
        //             arrows: false,
        //         }
        //     }
        // ]
    };
    return (
        <Slider  className='w-1/4' {...settings}>
            {props.typ == "CategoryInMenu" && arr && arr.map((item) => (
                <CategoryInMenu setMenuItem={props.setFunc} key={item} item={item} />
            ))}
            {props.typ == "SubCategoryInMenu" && arr && arr.map((item) => (
                <SubCategoryInMenu setMenuItemByCat={props.setFunc} key={item} item={item} />
            ))}
            {props.typ == "ItemInMenu" && arr && arr.map((item) => (
                <ItemInMenu  key={item._id}  item={item} />
            ))}
        </Slider>

    )
}

export default OrderMenuSlider
