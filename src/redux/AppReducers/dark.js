import { createSlice } from "@reduxjs/toolkit";

const darkSlice = createSlice({
  name: "dark",
  initialState: {
    dark: null,
  },
  reducers: {
    switchDark: (state, action) => {
      state.dark = action.payload
    },
  },
});

export const { switchDark } = darkSlice.actions;
export default darkSlice;
