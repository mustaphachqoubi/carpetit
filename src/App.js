import { Navbar, HeroBanner, Footer, Cart, Checkout } from "./components";
import { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartItems from "./components/Cart/CartItems";
import { getToken } from "./redux/CheckoutReducers/checkoutToken";
import { getCode } from "./redux/AppReducers/code";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const [dark, setdark] = useState(null);
  const pullDark = (darkit) => setdark(darkit);

  const [products, setProducts] = useState({ data: [] });
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const products = await commerce.products.list({
      include: "assets,variant_groups",
    });
    setProducts(products.data);
  };

  const fetchCart = async () => {
    const retrieve = await commerce.cart.retrieve();
    setCart(retrieve);
  };

  const handleAddToCart = async (productId, quantity) => {
    setCart(await commerce.cart.add(productId, quantity));
  };

  const handleUpdateQt = async (productId, quantity) => {
    setCart(await commerce.cart.update(productId, { quantity }));
  };

  const handleRemoveFromCart = async (productId) => {
    setCart(await commerce.cart.remove(productId));
  };

  const handleEmptyCart = async (productId) => {
    setCart(await commerce.cart.empty(productId));
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
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
      } catch (error) {}
    };

    generatetoken();
  }, [cart]);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

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
              console.log(dt.data[0].code);
            });
  }, [process.env.REACT_APP_CHEC_PUBLIC_KEY]);

  // useEffect(() => {
  //   fetch("https://api.chec.io/v1/discounts", {
  //     method: "GET",
  //     headers: {
  //       "X-Authorization": `sk_4660823b096d2de8f657d61dbf6d84d5a484a6be4c8a1`,
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((dt) => {
  //       dispatch(getCode(dt.data[0].code));
  //       console.log(dt.data[0].code);
  //     });
  // }, []);

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
                  cart={cart}
                  products={products}
                  totalItems={cart.total_unique_items}
                  onAddToCart={handleAddToCart}
                  handleAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  handleUpdateQt={handleUpdateQt}
                  handleRemoveFromCart={handleRemoveFromCart}
                  handleEmptyCart={handleEmptyCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <Checkout
                  cart={cart}
                  commerce={commerce}
                  handleCaptureCheckout={handleCaptureCheckout}
                  order={order}
                  error={errorMessage}
                />
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
