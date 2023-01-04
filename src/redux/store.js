import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./CarpetReducers/loading";
import selectedIdSlice from "./CarpetReducers/selectedId";
import carpetListSlice from "./CarpetReducers/carpetList";
import countSlice from "./CarpetReducers/count";
import touchStartSlice from "./CarpetReducers/touchStart";
import touchEndSlice from "./CarpetReducers/touchEnd";
import scrollSlice from "./CarpetReducers/scroll";
import selectedSizeSlice from "./CarpetReducers/selectedSize";
import sizeitBtnSlice from "./CarpetReducers/sizeitBtn";
import sizeitBtnIconSlice from "./CarpetReducers/sizeitBtnIcon";
import cuponBtnSlice from "./CarpetReducers/cuponBtn";
import cuponBtnIconSlice from "./CarpetReducers/cuponBtnIcon";
import hideOpenedProductSlice from "./CarpetReducers/hideOpenedProduct";

import checkoutTokenSlice from "./CheckoutReducers/checkoutToken";

import productsSlice from "./AppReducers/products";

import discountSlice from "./CarpetReducers/discount";

import codeSlice from "./AppReducers/code";

// import logger from 'redux-logger'
import thunk from 'redux-thunk'

const store = configureStore({
  reducer: {
    loader: loadingSlice.reducer,
    selector: selectedIdSlice.reducer,
    carpetlist: carpetListSlice.reducer,
    count: countSlice.reducer,
    touchStart: touchStartSlice.reducer,
    touchEnd: touchEndSlice.reducer,
    scroll: scrollSlice.reducer,
    selectedSize: selectedSizeSlice.reducer,
    sizeitBtn: sizeitBtnSlice.reducer,
    sizeitBtnIcon: sizeitBtnIconSlice.reducer,
    cuponBtn: cuponBtnSlice.reducer,
    cuponBtnIcon: cuponBtnIconSlice.reducer,
    hideOpenedProduct: hideOpenedProductSlice.reducer,
    checkoutToken: checkoutTokenSlice.reducer,
    products: productsSlice.reducer,
    discount: discountSlice.reducer,
    code: codeSlice.reducer,
  },
  middleware: [thunk]
});

export default store;
