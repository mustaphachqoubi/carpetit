import { createSlice } from "@reduxjs/toolkit";

const selectedIdSlice = createSlice({
    name: 'selectedId',
    initialState: {
        selectedId: null
    },
    reducers: {
        selectedIdGetId: (state, action) => {
            state.loading = action.payload
        },
        selectedIdNull: (state) => {
            state.loading = null
        }
    }
})

export const { selectedIdGetId, selectedIdNull } = selectedIdSlice.actions
export default selectedIdSlice