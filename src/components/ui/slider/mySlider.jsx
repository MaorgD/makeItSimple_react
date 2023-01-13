import React from 'react'
import Slider from "react-slick";
import CategoryInMenu from '../../menu/categoryInMenu';
import SubCategoryInMenu from '../../menu/subCategoryInMenu';


const MySlider = (props) => {
    const arr = props.arr
    const settings = {
        infinite: arr?.length>3?true:false,
        speed: 800,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,

                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    };
    return (
        <>
            {props.typ == "CategoryInMenu"
                &&
                <Slider  {...settings}>
                    {arr && arr.map((item) => (
                        <CategoryInMenu setMenuItem={props.setFunc} key={item} item={item} />
                    ))}
                </Slider>}
            {props.typ == "SubCategoryInMenu"
                &&
                <Slider  {...settings}>
                    {
                        arr && arr.map((item) => (
                            <SubCategoryInMenu setMenuItemByCat={props.setFunc} key={item} item={item} />
                        ))}
                </Slider>}


        </>
    )
}

export default MySlider
