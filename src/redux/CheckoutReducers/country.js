import { createSlice } from "@reduxjs/toolkit";

const countrySlice = createSlice({
    name: 'country',
    initialState: {
        country: ""
    },
    reducers: {
        setCountry: (state, action) => {
            state.country = action.payload
        }
    }
})

export const { setCountry } = countrySlice.actions
export default countrySlice