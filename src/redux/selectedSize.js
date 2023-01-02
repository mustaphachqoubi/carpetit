import { createSlice } from "@reduxjs/toolkit";

const selectedSizeSlice = createSlice({
    name: 'selectedSize',
    initialState: {
        selectedSize: -1
    },
    reducers: {
        selectedSizeId: (state, action) => {
            state.selectedSize = action.payload
        },
        selectedSizeInitial: (state) => {
            state.selectedSize = -1
        },
    }
})

export const { selectedSizeId, selectedSizeInitial } = selectedSizeSlice.actions
export default selectedSizeSlice