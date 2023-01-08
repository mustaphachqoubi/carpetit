import { createSlice } from "@reduxjs/toolkit";

const plusSlice = createSlice({
    name: 'plus',
    initialState: {
        plus: -1
    },
    reducers: {
        setPlusId: (state, action) => {
            state.plus = action.payload
        },
        setPlusInitial: (state) => {
            state.plus = -1
        },
    }
})

export const { setPlusId, setPlusInitial } = plusSlice.actions
export default plusSlice