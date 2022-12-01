import { createSlice } from "@reduxjs/toolkit";


const initState = {
    user: {
        id: "",
        userRole: "",
        jobs: [],

    },
    restaurantId: "",
}

const restaurantSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        saveInfo: (state, action) => {
            state.user = (action.payload.userInfo)
        },
        removeInfo: (state, action) => {
            state.user = {};
        },
        saveResrtaurant: (state, action) => {
            state.restaurantId = (action.payload.restaurantId)
        },
        removeResrtaurant: (state, action) => {
            state.restaurantId = '';
        },

    }
})

export const { removeInfo, saveInfo,saveResrtaurant,removeResrtaurant } = restaurantSlice.actions



export default restaurantSlice.reducer;