import { createSlice } from "@reduxjs/toolkit";

const selectedIdSlice = createSlice({
    name: 'selectedId',
    initialState: {
        selectedId: null
    },
    reducers: {
        selectedIdGetId: (state, action) => {
            state.selectedId = action.payload
        },
        selectedIdNull: (state) => {
            state.selectedId = null
        }
    }
})

export const { selectedIdGetId, selectedIdNull } = selectedIdSlice.actions
export default selectedIdSlice