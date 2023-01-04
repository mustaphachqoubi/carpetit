import { createSlice } from "@reduxjs/toolkit";

const touchStartSlice = createSlice({
    name: 'touchStart',
    initialState: {
        touchStart: null
    },
    reducers: {
        updateTouchStart: (state, action) => {
            state.touchStart = action.payload
        }
    }
})

export const { updateTouchStart } = touchStartSlice.actions
export default touchStartSlice