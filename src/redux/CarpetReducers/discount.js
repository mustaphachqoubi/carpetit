import { createSlice } from "@reduxjs/toolkit";

const discountSlice = createSlice({
  name: "discount",
  initialState: {
    discount: '',
  },
  reducers: {
    getDiscountCode: (state, action) => {
      state.discount = action.payload
    },
  },
});

export const { getDiscountCode } = discountSlice.actions;
export default discountSlice;
