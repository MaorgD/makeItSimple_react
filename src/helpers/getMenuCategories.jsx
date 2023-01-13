import { RESTAURNAT_ID } from '../services/servise';


export const getAllCategories = (restaurant) => {
    if (localStorage.getItem(RESTAURNAT_ID)) {
        if (restaurant) {
            let tempArr = [];
            restaurant.menu.map(item => {
                if (!tempArr.includes(item.category)) {

                    tempArr.push(item.category)
                }
            })
            return tempArr;
        }
    }
}