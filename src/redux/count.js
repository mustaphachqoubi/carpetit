import { createSlice } from "@reduxjs/toolkit";

const countSlice = createSlice({
    name: 'count',
    initialState: {
        count: 0
    },
    reducers: {
        updateCount: (state, action) => {
            state.count = action.payload
        },
        countToZero: (state) => {
            state.count = 0
        }
    }
})

export const { updateCount,  countToZero} = countSlice.actions
export default countSlice