// import { Navbar, HeroBanner, Footer, Checkout, Cart } from "./components";

import { Navbar, HeroBanner, Footer } from "./components";
import React, { useEffect, useState, Suspense, lazy } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getToken } from "./redux/CheckoutReducers/checkoutToken";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./redux/AppReducers/products";
import { switchDark } from "./redux/AppReducers/dark";
import {
  cartRetrieve,
  cartAdd,
  cartUpdateQT,
  cartRemove,
  cartEmpty,
  cartRefresh,
} from "./redux/AppReducers/cart";
import { setErrorMessage } from "./redux/AppReducers/errorMessage";
import LazyLoader from "./components/LazyLoader/LazyLoader";

const Cart = lazy(() => import("./components/Cart/Cart"));
const Checkout = lazy(() => import("./components/Checkout/Checkout")); 
function App() {
  const [order, setOrder] = useState({});
  const [newCheckoutToken, setNewCheckoutToken] = useState([]);
  const { dark } = useSelector((state) => state.dark);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const pullDark = (darkit) => dispatch(switchDark(darkit));

  const fetchProducts = async () => {
    const p = await commerce.products.list({
      include: "assets,variant_groups",
    });
    dispatch(getProducts(p.data));
  };

  const fetchCart = async () => {
    const retrieve = await commerce.cart.retrieve();
    dispatch(cartRetrieve(retrieve));
  };

  const handleAddToCart = async (productId, quantity, variantDATA) => {
    dispatch(
      cartAdd(await commerce.cart.add(productId, quantity, variantDATA))
    );
  };

  const handleUpdateQt = async (productId, quantity) => {
    dispatch(cartUpdateQT(await commerce.cart.update(productId, { quantity })));
  };

  const handleRemoveFromCart = async (productId) => {
    dispatch(cartRemove(await commerce.cart.remove(productId)));
  };

  const handleEmptyCart = async (productId) => {
    dispatch(cartEmpty(await commerce.cart.empty(productId)));
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    dispatch(cartRefresh(newCart));
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    const incommingOrder = await commerce.checkout.capture(
      checkoutTokenId,
      newOrder
    );
    try {
      setOrder(incommingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  const checkShippingOption = async (
    checkoutTokenId,
    shipping_option_id,
    country,
    region
  ) => {
    await commerce.checkout
      .checkShippingOption(checkoutTokenId, {
        shipping_option_id: shipping_option_id,
        country: country,
        region: region,
      })
      .then(function (data) {
        setNewCheckoutToken(data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    const generatetoken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart?.id, {
          type: "cart",
        });
        dispatch(getToken(token));
      } catch (error) {}
    };
    if (cart?.line_items?.length >= 1) {
      cart.id && generatetoken();
    } else {
    }
  });

  useEffect(() => {
    fetchProducts();
    fetchCart();
  });

  return (
    <div className={dark}>
      <div className="bg-[#FAFCFC] dark:bg-slate-800 max-w-[1440px] m-auto">
        <BrowserRouter>
          <Navbar pullDark={pullDark} totalItems={cart.total_unique_items} />
          <Routes>
            <Route
              path="/"
              element={
                <HeroBanner
                  onAddToCart={handleAddToCart}
                  handleAddToCart={handleAddToCart}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Cart
                    handleUpdateQt={handleUpdateQt}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleEmptyCart={handleEmptyCart}
                  />
                </Suspense>
              }
            />

            <Route
              path="/checkout"
              element={
                <Suspense fallback={<LazyLoader />}>
                  <Checkout
                    CheckShippingOption={checkShippingOption}
                    newCheckoutToken={newCheckoutToken}
                    handleCaptureCheckout={handleCaptureCheckout}
                    order={order}
                  />
                </Suspense>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
