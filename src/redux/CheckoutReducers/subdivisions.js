import { createSlice } from "@reduxjs/toolkit";

const subdivisionsSlice = createSlice({
    name: 'subdivisions',
    initialState: {
        s_ubdivisions: []
    },
    reducers: {
        setSubdivisions: (state, action) => {
            state.s_ubdivisions = action.payload
        }
    }
})

export const { setSubdivisions } = subdivisionsSlice.actions
export default subdivisionsSlice