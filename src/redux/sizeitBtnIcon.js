import { createSlice } from "@reduxjs/toolkit";

const sizeitBtnSlice = createSlice({
    name: 'sizeitBtnIcon',
    initialState: {
        sizeitBtnIcon: "Size it"
    },
    reducers: {
        sizeitBtnIconInitial: (state) => {
            state.sizeitBtnIcon = "Size it"
        },
        sizeitBtnIconValue: (state, action) => {
            state.sizeitBtnIcon = action.payload
        },
    }
})

export const { sizeitBtnIconInitial, sizeitBtnIconValue } = sizeitBtnSlice.actions
export default sizeitBtnSlice