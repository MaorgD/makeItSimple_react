import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    showiteminfo: false
    ,
    item: null,
    showadditem: false,
    showorderiteminfo:false
}

const toggleSlice = createSlice({
    name: "toggle",
    initialState: initialstate,
    reducers: {
        onClickShow: (state, action) => {
            state.showiteminfo = true;
            state.item = action.payload.item;
        },
        onClickAddItem: (state, action) => {
            state.showadditem = true;
            state.item = action.payload.item;
        },
        onClickShowOrder: (state, action) => {
            state.showorderiteminfo = true;
            state.item = action.payload.item;
        },
        onClickHide: (state) => {
            state.showiteminfo = false;
            state.item = null
        },
        onClickHideAddItem: (state) => {
            state.showadditem = false;
            state.item = null

        },
        onClickHideOrder: (state) => {
            state.showorderiteminfo = false;
            state.item = null

        },

    }
})

export const { onClickShow, onClickHide, onClickAddItem, onClickHideAddItem ,onClickShowOrder,onClickHideOrder} = toggleSlice.actions
export default toggleSlice.reducer