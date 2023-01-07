import { createSlice } from "@reduxjs/toolkit";

const subdivisionsSlice = createSlice({
    name: 'subdivisions',
    initialState: {
        subdivisions: []
    },
    reducers: {
        setSubdivisions: (state, action) => {
            state.subdivisions = action.payload
        }
    }
})

export const { setSubdivisions } = subdivisionsSlice.actions
export default subdivisionsSlice