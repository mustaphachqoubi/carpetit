import { createSlice } from "@reduxjs/toolkit";

const emptySlice = createSlice({
    name: 'empty',
    initialState: {
        empty: "Delete all"
    },
    reducers: {
        setDeleteSpinner: (state, action) => {
            state.empty = action.payload
        },
        setDeleteInitial: (state) => {
            state.empty = "Delete all"
        },
    }
})

export const { setDeleteSpinner, setDeleteInitial } = emptySlice.actions
export default emptySlice