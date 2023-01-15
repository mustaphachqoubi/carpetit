import { Navbar, HeroBanner, Footer, Checkout, Cart } from "./components";
import React, { useEffect, useState } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getToken } from "./redux/CheckoutReducers/checkoutToken";
import { getCode } from "./redux/AppReducers/code";
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
import { setOrder } from "./redux/AppReducers/order";
import { setErrorMessage } from "./redux/AppReducers/errorMessage";

function App() {
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

  const handleAddToCart = async (productId, quantity) => {
    dispatch(cartAdd(await commerce.cart.add(productId, quantity)));
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
    try {
      const incommingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incommingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    const generatetoken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        dispatch(getToken(token));
      } catch (error) {
        console.log(error);
      }
    };
    cart.id && generatetoken();
  });

  useEffect(() => {
    fetchProducts();
    fetchCart();
  });

  useEffect(() => {
    fetch("https://api.chec.io/v1/discounts", {
      method: "GET",
      headers: {
        "X-Authorization": `sk_4660823b096d2de8f657d61dbf6d84d5a484a6be4c8a1`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((dt) => {
        dispatch(getCode(dt.data[0].code));
      });
  });

  return (
    <div className={dark}>
      <div className="bg-[#FAFCFC] dark:bg-slate-800">
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
                  <Cart
                    handleUpdateQt={handleUpdateQt}
                    handleRemoveFromCart={handleRemoveFromCart}
                    handleEmptyCart={handleEmptyCart}
                  />
                }
              />
              <Route
                path="/checkout"
                element={
                  <Checkout handleCaptureCheckout={handleCaptureCheckout} />
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
