// import React, { useEffect, useState } from 'react'
// import { API_URL, doApiTukenGet, RESTAURNAT_ID } from '../../services/servise'
// import ItemOrder from '../orders/itemOrder';

// const AllWorkZone = () => {

//     const [allOrders, setAllOrders] = useState([]);
//     const [displayOrders, setDisplayOrders] = useState([]);

//     useEffect(() => {
//         doApiGetAllTOrders()
//     }, [])


//     const doApiGetAllTOrders = async () => {
//         try {
//             let url = `${API_URL}/orders/${localStorage.getItem(RESTAURNAT_ID)}?active=b&ownerType=both&orderType=both`
//             const { data } = await doApiTukenGet(url)
//             if (data)
//                 setAllOrders(data)
//             console.log(data)
//             setDisplayOrders(data)

//         } catch (err) {
//             console.log(err)

//         }
//     }

    
//     const getOrdersOfDrink = async () => {
//         if (allOrders[0]) {
//             let tempsArry = []
//             allOrders.map((item) => {

//                 if (item[0].orderItems[0].itemMenuId.category == "drink") {
//                     tempsArry.push(item)
//                 }
//             })
//             setDisplayOrders(tempsArry)
//         }
//     }


//     return (
//         <>
//         <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 my-3"> to see bar orders
//             {allOrders && allOrders.map((item) => (
//                 <ItemOrder key={item._id} item={item} />
//                 ))}
//         </div>
//         <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8 my-3">
//             {displayOrdersDrink && displayOrdersDrink.map((item) => (
//                 <ItemOrder key={item._id} item={item} />
//                 ))}
//         </div>
//                 </>
//     )
// }

// export default AllWorkZone