import { createSlice } from "@reduxjs/toolkit";

const checkoutTokenSlice = createSlice({
    name: 'checkoutToken',
    initialState: {
        checkoutToken: null
    },
    reducers: {
        getToken: (state, action) => {
            state.checkoutToken = action.payload
        }
    }
})

export const { getToken } = checkoutTokenSlice.actions
export default checkoutTokenSlice