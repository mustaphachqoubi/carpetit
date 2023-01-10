import { createSlice } from "@reduxjs/toolkit";

const selectedSizeSlice = createSlice({
    name: 'selectedSize',
    initialState: {
        selectedSize: null
    },
    reducers: {
        selectedSizeId: (state, action) => {
            state.selectedSize = action.payload
        },
        selectedSizeInitial: (state, action) => {
            state.selectedSize = action.payload
        },
    }
})

export const { selectedSizeId, selectedSizeInitial } = selectedSizeSlice.actions
export default selectedSizeSlice