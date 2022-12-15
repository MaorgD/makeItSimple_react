import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    showiteminfo: false
    ,
    item: null,
    showadditem:false,

}

const toggleSlice = createSlice({
    name: "toggle",
    initialState: initialstate,
    reducers: {
        onClickShow: (state, action) => {
            state.showiteminfo = true;
            state.item = action.payload.item;
        },
        onClickAddItem: (state) => {
            state.showadditem = true;
        },
        onClickHide: (state) => {
            state.showiteminfo = false;
            state.item = null
        },
        onClickHideAddItem: (state) => {
            state.showadditem = false;
        },

    }
})

export const { onClickShow, onClickHide ,onClickAddItem,onClickHideAddItem} = toggleSlice.actions
export default toggleSlice.reducer