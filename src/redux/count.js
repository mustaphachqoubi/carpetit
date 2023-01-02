import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
    name: 'count',
    initialState: {
        count: 0
    },
    reducers: {
        updateCount: (state, action) => {
            state.carpetList = action.payload
        },
        countToZero: (state) => {
            state.carpetList = 0
        }
    }
})

export const { updateCount,  countToZero} = countSlice.actions
export default countSlice