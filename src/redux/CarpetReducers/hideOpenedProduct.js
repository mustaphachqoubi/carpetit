import { createSlice } from "@reduxjs/toolkit";

const hideOpenedProductSlice = createSlice({
    name: 'hideOpenedProduct',
    initialState: {
        hideOpenedProduct: ""
    },
    reducers: {
        hideOpenedProductHidden: (state) => {
            state.hideOpenedProduct = 'hidden'
        },
        hideOpenedProductInitial: (state) => {
            state.hideOpenedProduct = ""
        }
    }
})

export const { hideOpenedProductHidden, hideOpenedProductInitial } = hideOpenedProductSlice.actions
export default hideOpenedProductSlice