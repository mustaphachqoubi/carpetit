import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./loading";
import selectedIdSlice from "./selectedId";
import carpetListSlice from "./carpetList";
import countSlice from "./count";
import touchStartSlice from "./touchStart";
import touchEndSlice from "./touchEnd";
import scrollSlice from "./scroll";
import selectedSizeSlice from "./selectedSize";
import sizeitBtnSlice from "./sizeitBtn";
import sizeitBtnIconSlice from "./sizeitBtnIcon";
import cuponBtnSlice from "./cuponBtn";
import cuponBtnIconSlice from "./cuponBtnIcon";
import hideOpenedProductSlice from "./hideOpenedProduct";

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
  },
});

export default store;
