import { createSlice } from "@reduxjs/toolkit";

const stepSlice = createSlice({
  name: "step",
  initialState: {
    step: 1,
  },
  reducers: {
    addStep: (state) => {
      state.step = state.step + 1;
    },
    removeStep: (state) => {
      state.step = state.step - 1;
    },
  },
});

export const { addStep, removeStep } = stepSlice.actions;
export default stepSlice;
