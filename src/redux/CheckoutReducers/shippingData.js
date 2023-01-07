import {createSlice} from '@reduxjs/toolkit'

const shippingDataSlice = createSlice({
    name: 'shippingData',
    initialState: {
        shippingData: {},
    },
    reducers: {
        getShippingData: (state, action) => {
            state.shippingData = action.payload
        }
    }
})

export const {getShippingData} = shippingDataSlice.actions
export default shippingDataSlice