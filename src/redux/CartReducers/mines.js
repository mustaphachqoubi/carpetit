import { createSlice } from "@reduxjs/toolkit";

const minesSlice = createSlice({
    name: 'mines',
    initialState: {
        mines: -1
    },
    reducers: {
        setMinesId: (state, action) => {
            state.mines = action.payload
        },
        setMinesInitial: (state) => {
            state.mines = -1
        },
    }
})

export const { setMinesId, setMinesInitial } = minesSlice.actions
export default minesSlice