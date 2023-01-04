import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: { data: [] }
    },
    reducers: {
        getToken: (state, action) => {
            state.products = action.payload
        }
    }
})

export const { getToken } = productsSlice.actions
export default productsSlice