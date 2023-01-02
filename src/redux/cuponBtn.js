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
  },
});

export const { cuponBtnInitial, cuponBtnGreen } = cuponBtnSlice.actions;
export default cuponBtnSlice;
