import React from 'react'

const CategoryInMenu = (props) => {

    const onClickCat = () => {
        props.setMenuItem(props.item)
    }

    
    return (
        <>

            <a onClick={onClickCat}
                key={props.item} className="  text-gray-700 border border-red-400 mt-2 text-2xl rounded-full  text-center  hover:bg-blue-400">
                <h3 className="m-1   ">{props.item}</h3>
            </a>


        </>
    )
}
export default CategoryInMenu