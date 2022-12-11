import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from '../redux/featchers/restaurantSlice'
import userSlice from '../redux/featchers/userSlice'


const myStore = configureStore({
    reducer: {
        restaurantSlice,
      userSlice
    }
  })

  export default myStore;