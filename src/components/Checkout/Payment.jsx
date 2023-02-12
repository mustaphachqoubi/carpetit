import { useState } from "react";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLICHABLE_KEY);

const Payment = ({
  backStep,
  nextStep,
  handleCaptureCheckout,
  newCheckoutToken,
}) => {
  const [payLoading, setPayLoading] = useState(<FaLock />);
  const { shippingData } = useSelector((state) => state.shippingData);
  const { checkoutToken } = useSelector((state) => state.checkoutToken);

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);

    const { error } = await stripe.createPaymentMethod({
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
          street: shippingData.street,
          town_city: shippingData.city,
          country_state: shippingData.subdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.country,
        },
        fulfillment: { shipping_method: shippingData.option },
        payment: {
          gateway: "test_gateway",
          card: {
            number: "4242424242424242",
            expiry_month: "02",
            expiry_year: "24",
            cvc: "123",
            postal_zip_code: "94107",
          },
        },
      };
      handleCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  };

  const onClickPayHandler = () => {
    setPayLoading(
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
    );
  };

  return (
    <>
      {newCheckoutToken.length < 1 ? (
        <div className="w-full p-20 flex justify-center align-center">
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
        </div>
      ) : (
        <div className="p-8">
          <h1 className="font-semibold text-lg py-5">Order summary</h1>

          <div className="grid md:grid-cols-2 gap-5">
            {!newCheckoutToken ? (
              <h3>Loading...</h3>
            ) : (
              newCheckoutToken?.line_items.map((carpet) => (
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
            <div className="font-medium text-md py-5 flex gap-1 flex-col md:flex-row justify-center align-center text-center">
              <h3>Total</h3> <h3>+</h3> <h3>Shipping</h3>
            </div>
            <h3 className="font-bold text-md py-5">
              {!newCheckoutToken ? (
                <h1>wait...</h1>
              ) : (
                `$ ${newCheckoutToken?.total_with_tax?.raw}.00`
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
                  <div className="flex justify-between flex-col md:flex-row gap-4">
                    <button
                      className="flex justify-center h-10 items-center px-8 rounded-md font-semibold bg-slate-300 text-gray-500 dark:text-gray-300 hover:bg-slate-400 dark:hover:text-white dark:hover:bg-slate-800 hover:text-white dark:bg-slate-600"
                      onClick={() => backStep()}
                    >
                      back
                    </button>
                    <button
                      className="flex justify-center items-center text-white font-semibold flex gap-2 items-center px-6 h-10 rounded-md rounded-md bg-blue-500 hover:bg-blue-700"
                      disabled={!stripe}
                      onClick={() => onClickPayHandler()}
                    >
                      Pay {payLoading}
                    </button>
                  </div>
                </form>
              )}
            </ElementsConsumer>
          </Elements>
        </div>
      )}
    </>
  );
};

export default Payment;
