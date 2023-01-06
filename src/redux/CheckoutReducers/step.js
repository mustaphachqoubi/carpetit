import {createSlice} from '@reduxjs/toolkit'

const stepSlice = createSlice({
    name: 'step',
    initialState: {
        step: 1
    },
    reducers: {
        getStep: (state, action) => {
            state.step = action.payload
        }
    }
})

export const {getStep} = stepSlice.actions
export default stepSlice