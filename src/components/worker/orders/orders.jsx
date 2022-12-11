import React from 'react'
import { useSelector } from 'react-redux';
import { RESTAURNAT_ID } from '../../../services/servise'

const Orders = () => {
    const user = useSelector(state => state.userSlice)
    // const restaurantId = useSelector(state => state.restaurantSlice.restaurantId)
    console.log(user)
    // console.log(restaurantId)
    console.log(localStorage.getItem(RESTAURNAT_ID))
    return (
        <div >

            {/* להביא את כל ההזמנות של המסעדה ולסדר אותם בטבלה לפי הסוג הזמנה  */}
            {/* לייצר טבלה שתעבוד לפי פילטור של סוג ההזמנה , להןסיף את כל האופציות של עובד לבצע הזמנה (3 יש)ןלהיכנס להזמנה קיימת לראות בה הכל , למחוק הזמנה  */}
            {/* לעשות לפי סוג הזמנה בקגראונד מתאים */}
        </div>
    )
}

export default Orders