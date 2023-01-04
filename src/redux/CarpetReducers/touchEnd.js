import { createSlice } from "@reduxjs/toolkit";

const touchEndSlice = createSlice({
    name: 'touchEnd',
    initialState: {
        touchEnd: null
    },
    reducers: {
        updateTouchEnd: (state, action) => {
            state.touchEnd = action.payload
        },
        nullTouchEnd: (state) => {
            state.touchEnd = null
        },
    }
})

export const { updateTouchEnd, nullTouchEnd } = touchEndSlice.actions
export default touchEndSlice