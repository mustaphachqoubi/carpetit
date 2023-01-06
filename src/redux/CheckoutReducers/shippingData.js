import {createSlice} from '@reduxjs/toolkit'

const shippingDataSlice = createSlice({
    name: 'shippingData',
    initialState: {
        shippingData: 1
    },
    reducers: {
        getStep: (state, action) => {
            state.shippingData = action.payload
        }
    }
})

export const {getStep} = shippingDataSlice.actions
export default shippingDataSlice