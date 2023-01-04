import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        loading: -1
    },
    reducers: {
        startLoad: (state, action) => {
            state.loading = action.payload
        },
        endLoad: (state) => {
            state.loading = -1
        }
    }
})

export const { startLoad, endLoad } = loadingSlice.actions
export default loadingSlice