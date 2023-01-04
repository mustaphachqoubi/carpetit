import { createSlice } from "@reduxjs/toolkit";

const carpetListSlice = createSlice({
    name: 'carpetlist',
    initialState: {
        carpetList: []
    },
    reducers: {
        carpetListGetProducts: (state, action) => {
            state.carpetList = action.payload
        }
    }
})

export const { carpetListGetProducts } = carpetListSlice.actions
export default carpetListSlice