import { createSlice } from "@reduxjs/toolkit";

const codeSlice = createSlice({
  name: "code",
  initialState: {
    code: '',
  },
  reducers: {
    getCode: (state, action) => {
      state.code = action.payload
    },
  },
});

export const { getCode } = codeSlice.actions;
export default codeSlice;
