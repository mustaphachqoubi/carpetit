import { createSlice } from "@reduxjs/toolkit";

const searchedCarpetListSlice = createSlice({
    name: 'searchedCarpetList',
    initialState: {
        searchedCarpetList: []
    },
    reducers: {
        setsearchedCarpetList: (state, action) => {
            state.searchedCarpetList = action.payload
        }
    }
})

export const { setsearchedCarpetList } = searchedCarpetListSlice.actions
export default searchedCarpetListSlice