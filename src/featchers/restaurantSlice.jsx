import { createSlice } from "@reduxjs/toolkit";


const initState = {
    user: {
        id: "",
        userRole: "",
        jobs: [],

    }
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

    }
})

export const { removeInfo, saveInfo } = restaurantSlice.actions



export default restaurantSlice.reducer;