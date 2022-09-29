import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDone } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { commerce } from "../../lib/commerce";
import { data } from "autoprefixer";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useForm, FormProvider } from "react-hook-form";
import CustomTextField from "./CustomTextField";

const Shipping = ({ next, checkoutToken, commerce }) => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [subdivisions, setSubdivisions] = useState([]);
  const [subdivision, setSubdivision] = useState("");
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState("");
  const [wait, setWait] = useState("");

  const methods = useForm();

  const fetchCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setCountries(countries);
    setCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setSubdivisions(subdivisions);
    setSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    setOptions(options);
    setOption(options[0].id);
  };

  const coun_tries = Object.entries(countries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const sub_divisions = Object.entries(subdivisions).map(([code, name]) => ({
    id: code,
    label: name,
  }));

  const opt_ions = options.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - (${sO.price.formatted_with_symbol})`,
  }));

  useEffect(() => {
    const token = async () => {
      let ch = await checkoutToken;
      !ch ? setWait("Loading...") : fetchCountries(ch.id);
    };
    token();
  }, [checkoutToken]);

  useEffect(() => {
    if (country) fetchSubdivisions(country);
  }, [country]);

  useEffect(() => {
    const token = async () => {
      let ch = await checkoutToken;
      if (subdivision) fetchOptions(ch.id, country, subdivision);
    };
    token();
  }, [subdivision]);

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({ ...data, country, subdivision, option })
          )}
          action=""
          method="get"
          className="grid sm:grid-cols-2 justify-items-center gap-8 p-5 mt-4 justify-center"
        >
          <CustomTextField
            required
            name="firstName"
            label="first name"
            placeholder="Fisrt name *"
          />
          <CustomTextField
            required
            name="lastName"
            label="last name"
            placeholder="Last name *"
          />
          <CustomTextField
            required
            name="address"
            label="address"
            placeholder="Address *"
          />
          <CustomTextField
            required
            name="email"
            label="email"
            placeholder="Email *"
          />
          <CustomTextField
            required
            name="city"
            label="city"
            placeholder="City *"
          />
          <CustomTextField
            required
            name="zip"
            label="zip"
            placeholder="ZIP / Postal code *"
          />
          {!country ? (
            <div className="flex gap-5 w-full p-5">
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
              <h3>Countries...</h3>
            </div>
          ) : (
            <select
              required
              title="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              name="country"
              className="dark:bg-slate-700 bg-gray-100 border-b border-gray-600 dark:border-slate-300 w-48 md:w-[20rem] py-4 outline-none"
            >
              {coun_tries.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          )}

          {!subdivision ? (
            <div className="flex gap-5 w-full p-5">
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
              <h3>Subdivisions...</h3>
            </div>
          ) : (
            <select
              required
              title="subdivision"
              value={subdivision}
              onChange={(e) => setSubdivision(e.target.value)}
              name="subdivision"
              className="dark:bg-slate-700 bg-gray-100 border-b border-gray-600 dark:border-slate-300 w-48 md:w-[20rem] py-4 outline-none"
            >
              {sub_divisions.map((s) => (
                <option value={s.id} key={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          )}

          {!option ? (
            <div className="flex gap-5 w-full p-5">
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
              <h3>Shipping options...</h3>
            </div>
          ) : (
            <select
              required
              title="shipping options"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              name="option"
              className="dark:bg-slate-700 bg-gray-100 border-b border-gray-600 dark:border-slate-300 w-48 md:w-[20rem] py-4 outline-none"
            >
              {opt_ions.map((o) => (
                <option value={o.id} key={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          )}
          <br />
          <div className="sm:col-span-2 gap-4 md:gap-0 sm:space-x-40 md:space-x-96 flex justify-between items-center flex-col sm:flex-row text-white font-semibold">
            <Link to="/cart">
              <button className="rounded-md bg-slate-300 text-gray-500 dark:text-gray-300 hover:bg-slate-400 dark:hover:text-white dark:hover:bg-slate-800 hover:text-white dark:bg-slate-600 w-[10rem] h-10">
                Back to cart
              </button>
            </Link>
            <button
              type="submit"
              className="rounded-md bg-blue-500 w-[10rem] h-10 hover:bg-blue-700 cursor-pointer"
              disabled={!option}
            >
              Next
            </button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Payment = ({
  checkoutToken,
  backStep,
  shippingData,
  nextStep,
  order,
  handleCaptureCheckout,
}) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "primary",
          street: shippingData.address,
          city: shippingData.city,
          country_state: shippingData.subdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.country,
        },
        fulfillment: { shipping_method: shippingData.option },
        payment: {
          geteway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      handleCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  };

  return (
    <>
      <div className="p-8">
        <h1 className="font-semibold text-lg py-5">Order summary</h1>

        <div className="grid md:grid-cols-2 gap-5">
          {!checkoutToken ? (
            <div className="flex gap-5">
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
              <h3>Loading...</h3>
            </div>
          ) : (
            checkoutToken.line_items.map((carpet) => (
              <div
                className="flex md:justify-around justify-between items-center"
                key={carpet.id}
              >
                <div>
                  <h3 className="font-semibold text-md">{carpet.name}</h3>
                  <h3 className="text-sm text-gray-500">
                    Quantity: {carpet.quantity}
                  </h3>
                </div>
                <h3 className="font-demibold text-green-600 dark:text-green-500">
                  {carpet.price.formatted_with_symbol}
                </h3>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-between py-5">
          <h3 className="font-medium text-md py-5">Total</h3>
          <h3 className="font-bold text-md py-5">
            {!checkoutToken ? (
              <div className="flex gap-5">
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
                <h3>Loading...</h3>
              </div>
            ) : (
              checkoutToken.total.formatted_with_symbol
            )}
          </h3>
        </div>
        <hr />
        <h1 className="font-semibold text-lg py-5">Payment method</h1>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                <CardElement />
                <br />
                <br />
                <div className="flex justify-between">
                  <button
                    className="px-8 rounded-md font-semibold bg-slate-300 text-gray-500 dark:text-gray-300 hover:bg-slate-400 dark:hover:text-white dark:hover:bg-slate-800 hover:text-white dark:bg-slate-600"
                    onClick={() => backStep()}
                  >
                    back
                  </button>
                  <button
                    className="text-white font-semibold flex gap-2 items-center px-6 py-2 rounded-md rounded-md bg-blue-500 hover:bg-blue-700"
                    disabled={!stripe}
                  >
                    Pay <FaLock />
                  </button>
                </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    </>
  );
};

const Confirmation = ({ shippingData }) => {
  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col">
          <h1>CONFIRMED</h1>
          <h1>thank you Mr, {shippingData.firstName}</h1>
        </div>
      </div>
    </>
  );
};

const Checkout = ({ cart, order, handleCaptureCheckout, error, setCart }) => {
  const [step, setStep] = useState(1);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    const generatetoken = async () => {
      try {
        let c = await cart;
        const token = await commerce.checkout.generateToken(c.id, {
          type: "cart",
        });
        setCheckoutToken(token);
      } catch (error) {}
    };
    generatetoken();
  }, [cart]);

  const nextStep = () => setStep((step) => step + 1);
  const backStep = () => setStep((step) => step - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  return (
    <div className="dark:text-white flex justify-center md:h-[50rem] p-10">
      <div className="rounded-md bg-gray-100 dark:bg-slate-700 w-[50rem]">
        <h1 className="font-bold tracking-wider text-2xl p-4 md:p-8 flex justify-center items-center">
          Checkout
        </h1>
        <div className="px-2 sm:flex justify-between">
          <ul className="flex p-2 gap-2 items-center justify-center">
            <li
              className={`text-white px-2 rounded-full ${
                step > 1 ? "bg-blue-400 py-2" : "bg-blue-500"
              }`}
            >
              {step !== 1 ? <MdDone /> : "1"}
            </li>
            <li
              className={` ${
                step === 1
                  ? "text-gray-700 font-semibold dark:text-white"
                  : "text-gray-500 dark:text-slate-400"
              }`}
            >
              Shipping address
            </li>
          </ul>
          <div className="flex items-center justify-center">
            <div className="border-l h-6 sm:border-b border-slate-400 dark:border-white sm:h-0 sm:w-20 sm:w-40 md:w-[20rem]" />
          </div>
          <ul className="flex p-2 gap-4 sm:gap-2 items-center justify-center">
            <li
              className={`text-white ${
                step < 2
                  ? "bg-blue-400 "
                  : step > 2
                  ? "bg-blue-400 py-2"
                  : "bg-blue-500"
              } px-2 rounded-full`}
            >
              {step > 2 ? <MdDone /> : "2"}
            </li>
            <li
              className={` ${
                step === 2
                  ? "text-gray-700 font-semibold dark:text-white"
                  : "text-gray-500 dark:text-slate-400"
              }`}
            >
              Payment details
            </li>
          </ul>
        </div>
        {step === 1 ? (
          <Shipping
            setStep={setStep}
            checkoutToken={checkoutToken}
            setCheckoutToken={setCheckoutToken}
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
