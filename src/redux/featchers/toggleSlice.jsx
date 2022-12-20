import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    showiteminfo: false
    ,
    item: null,
    showadditem: false,
    showorderiteminfo:false,
    showEditItem:false
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
        },
        onClickHideOrder: (state) => {
            state.showorderiteminfo = false;
            state.item = null

        },
        onClickHideEditItem: (state) => {
            state.showEditItem = false;
            state.item = null

        },
        onClickShowEditItem: (state, action) => {
            state.showiteminfo = false;
            state.showEditItem = true;
        },
        onClickreturninfo: (state, action) => {
            state.showiteminfo = true;
            state.showEditItem = false;
        },

    }
})

export const { onClickShow, onClickHide, onClickAddItem, onClickHideAddItem ,onClickShowOrder,onClickHideOrder ,
     onClickHideEditItem , onClickShowEditItem,onClickreturninfo} = toggleSlice.actions
export default toggleSlice.reducer