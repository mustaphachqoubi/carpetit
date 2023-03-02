import React from "react";
import { MdDone } from "react-icons/md";
import Shipping from "../StepOne/Shipping";
import Payment from "../StepTwo/Payment";
import Confirmation from "../StepThree/Confirmation";
import { useSelector, useDispatch } from "react-redux";
import { addStep, removeStep } from "../../../redux/CheckoutReducers/step";
import { getShippingData } from "../../../redux/CheckoutReducers/shippingData";

const Checkout = ({
  handleCaptureCheckout,
  order,
  CheckShippingOption,
  newCheckoutToken,
  totalItems,
}) => {
  const { step } = useSelector((state) => state.step);
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const nextStep = () => dispatch(addStep());
  const backStep = () => dispatch(removeStep());

  const next = (data) => {
    dispatch(getShippingData(data));
    nextStep();
  };

  return (
    <div className="dark:text-white flex gap-4 flex-col items-center justify-center py-10 mx-5 overflow-hidden">
      {!totalItems && (
        <div className="flex bg-red-500 w-full md:w-[50rem] py-2 px-4 text-center rounded-md text-white font-bold justify-center items-center">
          Your cart is empty make sure to add a carpet first.
        </div>
      )}
      <div className="rounded-md bg-gray-100 dark:bg-slate-700 w-[50rem] px-20 md:px-6">
        <h1 className="font-bold tracking-wider text-2xl p-4 md:p-8 flex justify-center items-center">
          Checkout
        </h1>

        <div className="sm:flex justify-between py-4 px-8">
          <div className="flex space-x-2 items-center justify-center">
            <h4
              className={`text-white px-2 rounded-full ${
                step > 1
                  ? "bg-blue-400 py-2"
                  : step === 1
                  ? "bg-blue-500 py-[0.2rem] px-[0.7rem]"
                  : "bg-blue-500 py-[0.5rem] px-[0.5rem]"
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
                  : "bg-blue-500 py-[0.2rem] px-[0.6rem]"
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
          <Shipping next={next} CheckShippingOption={CheckShippingOption} />
        ) : step === 2 ? (
          <Payment
            backStep={backStep}
            handleCaptureCheckout={handleCaptureCheckout}
            nextStep={nextStep}
            newCheckoutToken={newCheckoutToken}
          />
        ) : (
          <Confirmation order={order} />
        )}
      </div>
    </div>
  );
};

export default Checkout;
