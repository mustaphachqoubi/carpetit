import { createSlice } from "@reduxjs/toolkit";

const cuponBtnSlice = createSlice({
  name: "cuponBtn",
  initialState: {
    cuponBtn: "bg-black",
  },
  reducers: {
    cuponBtnInitial: (state) => {
      state.cuponBtn = "bg-black";
    },
    cuponBtnGreen: (state) => {
      state.cuponBtn = "bg-green-500";
    },
    cuponBtnRed: (state) => {
      state.cuponBtn = "bg-red-500";
    },
  },
});

export const { cuponBtnInitial, cuponBtnGreen, cuponBtnRed } = cuponBtnSlice.actions;
export default cuponBtnSlice;
