import { createSlice } from "@reduxjs/toolkit";

const scrollSlice = createSlice({
    name: 'scroll',
    initialState: {
        scroll: ''
    },
    reducers: {
        hiddenScroll: (state) => {
            state.scroll = 'hidden'
        },
        backScroll: (state) => {
            state.scroll = ''
        },
    }
})

export const { hiddenScroll, backScroll } = scrollSlice.actions
export default scrollSlice