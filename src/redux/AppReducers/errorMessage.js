import { createSlice } from "@reduxjs/toolkit";

const errorMessageSlice = createSlice({
  name: "errorMessage",
  initialState: {
    errorMessage: "",
  },
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setErrorMessage } = errorMessageSlice.actions;
export default errorMessageSlice;
