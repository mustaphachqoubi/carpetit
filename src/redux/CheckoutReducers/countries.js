import { createSlice } from "@reduxjs/toolkit";

const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        countries: []
    },
    reducers: {
        setCountries: (state, action) => {
            state.countries = action.payload
        }
    }
})

export const { setCountries } = countriesSlice.actions
export default countriesSlice