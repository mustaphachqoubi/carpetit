import { createSlice } from "@reduxjs/toolkit";

const cuponBtnIconSlice = createSlice({
  name: "cuponBtnIcon",
  initialState: {
    cuponBtnIcon: "check",
  },
  reducers: {
    cuponBtnIconInitial: (state) => {
      state.cuponBtnIcon = "check";
    },
    cuponBtnIconValue: (state, action) => {
      state.cuponBtnIcon = action.payload
    },
  },
});

export const { cuponBtnIconInitial, cuponBtnIconValue } = cuponBtnIconSlice.actions;
export default cuponBtnIconSlice;
