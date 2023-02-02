import React, { useRef } from 'react'


const InputZone = (props) => {

    const setKitchenZone = props.setKitchenZone
    const kitchenZone = props.kitchenZone
    const ref = useRef()


    const handleClick = () => {
        if (ref.current.value == "" || ref.current.value == " "|| ref.current.value == "  ") {
            return alert("Name too short")

        }
        setKitchenZone([...kitchenZone, ref.current.value]);
    };


    return (
        <div className='col-span-6 flex '>
            <div className='flex-col justify-center items-center mr-4 '>

                <input className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mr-4' type="text" ref={ref} />
                <button className=' text-blue-300 ml-6' type='button' onClick={handleClick}>Add Item</button>
            </div>
            <div className='bg-blue-100 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' >

                <ul >
                    {kitchenZone?.map(item => (
                        <li className='text-center m-1' key={item}>{item}
                            {item != "main kitchen" &&
                                <button className='ml-5' type='button' onClick={() => {
                                    setKitchenZone(
                                        kitchenZone.filter((i) => i != item)
                                    )
                                }}>X
                                </button>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default InputZone