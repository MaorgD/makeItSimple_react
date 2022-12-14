import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    showiteminfo: false
    ,
    item: null,
}

const toggleSlice = createSlice({
    name: "toggle",
    initialState: initialstate,
    reducers: {
        onClickShow: (state, action) => {
            state.showiteminfo = true;
            state.item = action.payload.item;
        },
        onClickHide: (state, action) => {
            state.showiteminfo = false;
            state.item = null
        }

    }
})

export const { onClickShow, onClickHide } = toggleSlice.actions
export default toggleSlice.reducer