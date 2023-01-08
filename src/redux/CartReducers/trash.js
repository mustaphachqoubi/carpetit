import { createSlice } from "@reduxjs/toolkit";

const trashSlice = createSlice({
    name: 'trash',
    initialState: {
        trash: -1
    },
    reducers: {
        setTrashId: (state, action) => {
            state.trash = action.payload
        },
        setTrashInitial: (state) => {
            state.trash = -1
        },
    }
})

export const { setTrashId, setTrashInitial } = trashSlice.actions
export default trashSlice