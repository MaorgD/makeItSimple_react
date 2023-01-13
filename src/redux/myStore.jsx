import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from '../redux/featchers/restaurantSlice'
import userSlice from '../redux/featchers/userSlice'
import toggleSlice from '../redux/featchers/toggleSlice'


const myStore = configureStore({
  reducer: {
    restaurantSlice,
    userSlice,
    toggleSlice
  }
})

export default myStore;