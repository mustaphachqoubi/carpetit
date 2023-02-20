import React from "react";
import CartItems from "./CartItems";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setDeleteSpinner,
  setDeleteInitial,
} from "../../redux/CartReducers/empty";

const EmptyCart = () => {
  return (
    <div className="h-screen text-center py-48 px-10">
      <h1 className="text-2xl font-bold dark:text-white ">
        There's no Carpets in your cart,{" "}
        <Link to="/">
          <span className="font-semibold text-blue-500 cursor-pointer">
            Add Carpets!
          </span>
        </Link>
      </h1>
      <div className="flex justify-center p-10">
        <Link to="/">
          <button className="font-semibold bg-blue-500 hover:bg-blue-700 py-3 px-6 rounded-sm text-white">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

const Cart = ({ handleUpdateQt, handleRemoveFromCart, handleEmptyCart }) => {
  const { empty } = useSelector((state) => state.empty);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return cart?.length >= 0 ? (
    <h1 className="font-bold dark:text-white text-2xl flex justify-center items-center p-10 h-screen">
      Loading...
    </h1>
  ) : cart?.line_items.length <= 0 ? (
    <EmptyCart />
  ) : (
    <div className="dark:text-white">
       <div>
      </div>
      <div className="flex justify-center p-10 text-center">
        <h1 className="font-bold text-2xl">
          You Have{" "}
          <span className="text-orange-500">{cart.total_unique_items}</span>{" "}
          carpet{cart?.total_unique_items > 1 ? "s" : ""} in your cart
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-[2rem] py-20 px-5 items-center">
        <CartItems
          cart={cart}
          handleUpdateQt={handleUpdateQt}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between p-10">
        <div className="mb-10 md:mb-1 flex gap-4 justify-center items-center">
          <Link to="/checkout">
            <button className="rounded-md text-white hover:bg-green-700 cursor-pointer font-semibold bg-green-500 w-[7.3rem] h-[3rem]">
              Checkout
            </button>
          </Link>
          <button
            onClick={() => {
              dispatch(
                setDeleteSpinner(
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 animate-spin text-slate-300 fill-blue-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                )
              );
              setTimeout(function () {
                dispatch(setDeleteInitial());
              }, 2000);
              handleEmptyCart(cart?.id);
            }}
            className="font-semibold flex items-center justify-center bg-red-500 hover:bg-red-700 w-[7.3rem] h-[3rem] rounded-md text-white"
          >
            {empty}
          </button>
        </div>

        <h3 className="text-md font-bold ">
          Total:{" "}
          <span className="text-slate-400 dark:text-slate-500">
            {cart?.subtotal?.formatted_with_symbol}
          </span>
        </h3>
      </div>
      <div className="flex justify-center p-10">
        <Link to="/">
          <button className="font-semibold bg-blue-500 hover:bg-blue-700 py-3 px-6 rounded-sm text-white">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
