import { createSlice } from "@reduxjs/toolkit";

const subdivisionSlice = createSlice({
    name: 'subdivision',
    initialState: {
        subdivision: ""
    },
    reducers: {
        setSubdivision: (state, action) => {
            state.subdivision = action.payload
        }
    }
})

export const { setSubdivision } = subdivisionSlice.actions
export default subdivisionSlice