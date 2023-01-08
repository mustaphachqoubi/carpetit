import { createSlice } from "@reduxjs/toolkit";
import { FiShoppingCart } from "react-icons/fi";


const loadingHSlice = createSlice({
    name: 'loading',
    initialState: {
        loading: <FiShoppingCart />
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setLoadingInitial: (state) => {
            state.loading = <FiShoppingCart />
        }
    }
})

export const {setLoading, setLoadingInitial} = loadingHSlice.actions
export default loadingHSlice