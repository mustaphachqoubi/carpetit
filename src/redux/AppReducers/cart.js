import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    cartRetrieve: (state, action) => {
      state.cart = action.payload;
    },
    cartAdd: (state, action) => {
      state.cart = action.payload;
    },
    cartUpdateQT: (state, action) => {
      state.cart = action.payload;
    },
    cartRemove: (state, action) => {
      state.cart = action.payload;
    },
    cartEmpty: (state, action) => {
      state.cart = action.payload;
    },
    cartRefresh: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const {
  cartRetrieve,
  cartAdd,
  cartUpdateQT,
  cartRemove,
  cartEmpty,
  cartRefresh,
} = cartSlice.actions;
export default cartSlice;
