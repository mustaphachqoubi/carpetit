import { createSlice } from "@reduxjs/toolkit";

const thankMessageLoadingSlice = createSlice({
    name: 'thankMessageLoading',
    initialState: {
        thankMessageLoading: <div />
    },
    reducers: {
        setThankMessageLoading: (state, action) => {
            state.thankMessageLoading = action.payload
        }
    }
})

export const { setThankMessageLoading } = thankMessageLoadingSlice.actions
export default thankMessageLoadingSlice