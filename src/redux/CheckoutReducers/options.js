import { createSlice } from "@reduxjs/toolkit";

const optionsSlice = createSlice({
    name: 'options',
    initialState: {
        o_ptions: []
    },
    reducers: {
        setOptions: (state, action) => {
            state.o_ptions = action.payload
        }
    }
})

export const { setOptions } = optionsSlice.actions
export default optionsSlice