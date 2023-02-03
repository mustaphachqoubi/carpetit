import { createSlice } from "@reduxjs/toolkit";

const selectedSizeSlice = createSlice({
  name: "selectedSize",
  initialState: {
    selectedSize: null
    // selectedSize: products.variant_groups[0].options[0].id,
  },
  reducers: {
    selectedSizeId: (state, action) => {
      state.selectedSize = action.payload;
    },
    selectedSizeInitial: (state, action) => {
      state.selectedSize = action.payload;
    },
  },
});

export const { selectedSizeId, selectedSizeInitial } =
  selectedSizeSlice.actions;
export default selectedSizeSlice;
