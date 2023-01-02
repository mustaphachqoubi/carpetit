//

import { createSlice } from "@reduxjs/toolkit";

const sizeitBtnSlice = createSlice({
    name: 'sizeitBtn',
    initialState: {
        sizeitBtn: "bg-black"
    },
    reducers: {
        sizeitBtnGreen: (state) => {
            state.sizeitBtn = "bg-green-500"
        },
        sizeitBtnBlack: (state) => {
            state.sizeitBtn = "bg-black"
        },
    }
})

export const { sizeitBtnGreen, sizeitBtnBlack } = sizeitBtnSlice.actions
export default sizeitBtnSlice