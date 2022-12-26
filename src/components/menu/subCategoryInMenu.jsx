import React from 'react'

const SubCategoryInMenu = (props) => {

    const onClickSubCat = () => {
        props.setMenuItemByCat(props.item)
    }

    
    return (
        <>

            <div id={props.item} onClick={onClickSubCat}
                key={props.item} className=" text-gray-700 border border-purple-400 mt-2 text-2xl rounded-full  text-center  hover:bg-purple-200 ml-3">
                <h3 className="  ">{props.item}</h3>
            </div>


        </>
    )
}
export default SubCategoryInMenu