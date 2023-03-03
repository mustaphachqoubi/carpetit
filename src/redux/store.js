import { configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import thunk from "redux-thunk";

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
import darkSlice from "./AppReducers/dark";
import cartSlice from "./AppReducers/cart";
import orderSlice from "./AppReducers/order";
import errorMessageSlice from "./AppReducers/errorMessage";
import stepSlice from "./CheckoutReducers/step";
import shippingDataSlice from "./CheckoutReducers/shippingData";
import confirmationLoadingSlice from "./CheckoutReducers/confirmationLoading";
import referenceLoadingSlice from "./CheckoutReducers/referenceLoading";
import thankMessageLoadingSlice from "./CheckoutReducers/thankMessageLoading";
import countriesSlice from "./CheckoutReducers/countries";
import countrySlice from "./CheckoutReducers/country";
import subdivisionsSlice from "./CheckoutReducers/subdivisions";
import subdivisionSlice from "./CheckoutReducers/subdivision";
import optionsSlice from "./CheckoutReducers/options";
import optionSlice from "./CheckoutReducers/option";
import emptySlice from "./CartReducers/empty";
import trashSlice from "./CartReducers/trash";
import plusSlice from "./CartReducers/plus";
import minesSlice from "./CartReducers/mines";
import loadingHSlice from "./HeroBannerReducers/loading";
import searchRefSlice from "./CarpetReducers/searchInputReducer";
import searchedCarpetListSlice from "./CarpetReducers/SearchedCarpetList";

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
    dark: darkSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    errorMessage: errorMessageSlice.reducer,
    step: stepSlice.reducer,
    shippingData: shippingDataSlice.reducer,
    confirmationLoading: confirmationLoadingSlice.reducer,
    referenceLoading: referenceLoadingSlice.reducer,
    thankMessageLoading: thankMessageLoadingSlice.reducer,
    c_ountries: countriesSlice.reducer,
    country: countrySlice.reducer,
    s_ubdivisions: subdivisionsSlice.reducer,
    subdivision: subdivisionSlice.reducer,
    o_ptions: optionsSlice.reducer,
    option: optionSlice.reducer,
    empty: emptySlice.reducer,
    trash: trashSlice.reducer,
    plus: plusSlice.reducer,
    mines: minesSlice.reducer,
    loading: loadingHSlice.reducer,
    searchRef: searchRefSlice.reducer,
    searchedCarpetList: searchedCarpetListSlice.reducer,
  },
  middleware: [thunk],
});

export default store;
