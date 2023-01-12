import { createSlice } from "@reduxjs/toolkit";

const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        c_ountries: []
    },
    reducers: {
        setCountries: (state, action) => {
            state.c_ountries = action.payload
        }
    }
})

export const { setCountries } = countriesSlice.actions
export default countriesSlice