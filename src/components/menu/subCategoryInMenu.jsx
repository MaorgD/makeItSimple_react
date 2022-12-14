import React from 'react'

const SubCategoryInMenu = (props) => {

    const onClickSubCat = () => {
        props.setMenuItemByCat(props.item)
    }

    
    return (
        <>

            <a onClick={onClickSubCat}
                key={props.item} className="  text-gray-700 border border-red-400 mt-2 text-2xl rounded-full  text-center  hover:bg-blue-400">
                <h3 className="m-1   ">{props.item}</h3>
            </a>


        </>
    )
}
export default SubCategoryInMenu