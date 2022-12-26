import React from 'react'

const CategoryInMenu = (props) => {

    const onClickCat = () => {
        props.setMenuItem(props.item)
    }

    
    return (
        <>

            <div onClick={onClickCat}
                key={props.item} className="  text-gray-700 border border-purple-400 mt-2 text-2xl rounded-full  text-center  hover:bg-purple-200 ml-3">
                <h3 className="m-1   ">{props.item}</h3>
            </div>


        </>
    )
}
export default CategoryInMenu