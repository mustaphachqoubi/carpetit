import { createSlice } from "@reduxjs/toolkit";

const searchRefSlice = createSlice({
    name: 'searchRef',
    initialState: {
        searchRef: ''
    },
    reducers: {
        getSearchRef(state, action){
            state.searchRef = action.payload
        }
    }
})

export const {getSearchRef} = searchRefSlice.actions
export default searchRefSlice