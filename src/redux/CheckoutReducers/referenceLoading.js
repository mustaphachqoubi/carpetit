import { createSlice } from "@reduxjs/toolkit";

const referenceLoadingSlice = createSlice({
    name: 'referenceLoading',
    initialState: {
        referenceLoading: <div />
    },
    reducers: {
        setreferenceLoading: (state, action) => {
            state.referenceLoading = action.payload
        }
    }
})

export const { setreferenceLoading } = referenceLoadingSlice.actions
export default referenceLoadingSlice