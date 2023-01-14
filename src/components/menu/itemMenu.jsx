import React from 'react'
import { useDispatch } from 'react-redux'
import { onClickShow } from '../../redux/featchers/toggleSlice'
import { API_URL, doApiMethodToken } from '../../services/servise'
const ItemMenu = (props) => {
    const dispatch = useDispatch()
    const item = props.item
    const fromTable = props.fromTable;
    const orderID = props.orderID
    const openItem = () => {
        dispatch(onClickShow({ item: item }));
    }
    const onAddItemToOrder = async () => {
        const url = `${API_URL}/orders/addItemToOrder/${orderID}/${item._id}/${item.price}`;
        try {

            const data = await doApiMethodToken(url, "post", { note: "nn" });
            if (data) {
                
                // window.location.reload(false);

                console.log(data)
            } else {
                console.log(data)
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    return (

        <>
            <div key={item._id} className="group ">
                <div onClick={() => { openItem() }} className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-4 xl:aspect-h-4">
                    <img
                        src={item.img}
                        alt={item.img}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>

                <h3 className="mt-4 text-sm text-gray-700">{item.name}</h3>
                <div className='flex justify-between'>

                    <p className="mt-1 text-lg font-medium text-gray-900">{item.price}</p>
                    {fromTable &&
                        <div className='space-x-1 '>

                            <button onClick={() => { console.log("-") }} className='border-2 rounded-lg bg-red-500 h-7 w-7 '>-</button>
                            <button onClick={() => { onAddItemToOrder() }} className='border-2 rounded-lg bg-green-500 h-7 w-7 '>+</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default ItemMenu