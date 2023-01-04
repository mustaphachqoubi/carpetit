import React, { useState, useEffect, useRef } from "react";
import { MdDone } from "react-icons/md";
import { commerce } from "../../lib/commerce";
// import { data } from "autoprefixer";

import Shipping from './Shipping'
import Payment from './Payment'
import Confirmation from './Confirmation'
import { useDispatch, useSelector } from "react-redux";
// import {getToken} from '../../redux/CheckoutReducers/checkoutToken'


const Checkout = ({ cart, order, handleCaptureCheckout, error, setCart }) => {
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState({});

  // const [coupon, setCoupon] = useState("");

  const {checkoutToken} = useSelector(state => state.checkoutToken)
  // useEffect(() => {
  //   const generatetoken = async () => {
  //     try {
  //       let c = await cart;
  //       const token = await commerce.checkout.generateToken(c.id, {
  //         type: "cart",
  //       });
  //       dispatch(getToken(token))
  //     } catch (error) {}
  //   };
  //   generatetoken();
  // }, [cart]);

  // const fetchDiscounts = async () => {
  //   const c = await commerce.checkout.checkDiscount(checkoutToken.id, {code: '6881C133B2',});
  //   setCoupon(c);
  //   console.log(c)
  // };

  const nextStep = () => setStep((step) => step + 1);
  const backStep = () => setStep((step) => step - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  useEffect(() => {
    // checkoutToken ? fetchDiscounts() : console.log('hi')
    console.log(checkoutToken)
  }, [checkoutToken])

  return (
    <div className="dark:text-white flex justify-center p-10">
      <div className="rounded-md bg-gray-100 dark:bg-slate-700 w-[50rem]">
        <h1 className="font-bold tracking-wider text-2xl p-4 md:p-8 flex justify-center items-center">
          Checkout
        </h1>

        <div className="sm:flex justify-between py-4 px-8">
          <div className="flex space-x-2 items-center justify-center">
            <h4
              className={`text-white px-2 rounded-full ${
                step > 1
                  ? "bg-blue-400 py-2"
                  : "bg-blue-500 py-[0.2rem] px-[0.7rem]"
              }`}
            >
              {step !== 1 ? <MdDone /> : "1"}
            </h4>
            <h4
              className={` ${
                step === 1
                  ? "text-gray-700 font-semibold dark:text-white"
                  : "text-gray-500 dark:text-slate-400"
              }`}
            >
              Shipping address
            </h4>
          </div>
          <div className="flex items-center justify-center">
            <div className="border-l h-6 sm:border-b border-slate-400 dark:border-white sm:h-0 sm:w-20 sm:w-40 md:w-[20rem]" />
          </div>
          <div className="flex space-x-4 sm:space-x-2 items-center justify-center">
            <h4
              className={`text-white ${
                step < 2
                  ? "bg-blue-400 py-[0.2rem] px-[0.6rem]"
                  : step > 2
                  ? "bg-blue-400 py-2"
                  : "bg-blue-500 py-[0.2rem] px-[0.7rem]"
              } px-2 rounded-full`}
            >
              {step > 2 ? <MdDone /> : "2"}
            </h4>
            <h4
              className={` ${
                step === 2
                  ? "text-gray-700 font-semibold dark:text-white"
                  : "text-gray-500 dark:text-slate-400"
              }`}
            >
              Payment details
            </h4>
          </div>
        </div>

        {step === 1 ? (
          <Shipping
            setStep={setStep}
            checkoutToken={checkoutToken}
            // getToken={getToken}
            // setCheckoutToken={setCheckoutToken}
            next={next}
            commerce={commerce}
            cart={cart}
            nextStep={nextStep}
          />
        ) : step === 2 ? (
          <Payment
            cart={cart}
            checkoutToken={checkoutToken}
            commerce={commerce}
            backStep={backStep}
            handleCaptureCheckout={handleCaptureCheckout}
            shippingData={shippingData}
            nextStep={nextStep}
            order={order}
          />
        ) : (
          <Confirmation shippingData={shippingData} order={order} />
        )}
      </div>
    </div>
  );
};

export default Checkout;