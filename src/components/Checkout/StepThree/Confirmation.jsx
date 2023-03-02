import { useEffect } from "react";
import { done, error, warning } from "../../../assets/index";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setConfirmationLoading } from "../../../redux/CheckoutReducers/confirmationLoading";
import { setreferenceLoading } from "../../../redux/CheckoutReducers/referenceLoading";
import { setThankMessageLoading } from "../../../redux/CheckoutReducers/thankMessageLoading";
import { removeStep } from "../../../redux/CheckoutReducers/step";
import {initialStep} from '../../../redux/CheckoutReducers/step'
const Confirmation = ({ order }) => {
  const { shippingData } = useSelector((state) => state.shippingData);
  const { confirmationLoading } = useSelector(
    (state) => state.confirmationLoading
  );
  const { referenceLoading } = useSelector((state) => state.referenceLoading);
  const { thankMessageLoading } = useSelector(
    (state) => state.thankMessageLoading
  );

  const dispatch = useDispatch();

  const handleConfirmationLoad = async () => {
    const or = await order;
    setTimeout(function () {
      dispatch(
        setConfirmationLoading(
          <img className="w-12" src={or ? done : error} alt="done" />
        )
      );
    }, 8000);
  };

  const handleReferenceLoad = async () => {
    const or = await order;
    dispatch(
      setreferenceLoading(
        or ? order?.customer_reference : <img className="w-10" src={warning} />
      )
    );
  };

  const handlethankMessageLoad = async () => {
    const ref = await referenceLoading;
    setTimeout(function () {
      dispatch(
        setThankMessageLoading(
          ref?.length >= 1 || shippingData?.firstName ? (
            <h1 className="text-sm">Thank you Mr. {shippingData?.firstName}</h1>
          ) : (
            <h1 className="text-sm">There is an error, Please try again !</h1>
          )
        )
      );
    }, 5000);
  };

  useEffect(() => {
    handleConfirmationLoad();
    handleReferenceLoad();
    handlethankMessageLoad();
  }, [order]);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col p-8 items-center space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="font-bold">CONFIRMED</h1>
            {confirmationLoading && referenceLoading ? (
              confirmationLoading
            ) : (
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
            )}
          </div>
          <h1 className="text-sm flex items-center">
            order_reference: {referenceLoading}
          </h1>
          <div className="text-center">
            {thankMessageLoading && referenceLoading && thankMessageLoading}
          </div>
        </div>
      </div>
      <div className="p-8 flex flex-col md:flex-row gap-4 md:gap-0 items-center md:justify-between">
        <button
          className="w-[10rem] h-10 rounded-md font-semibold bg-slate-300 text-gray-500 dark:text-gray-300 hover:bg-slate-400 dark:hover:text-white dark:hover:bg-slate-800 hover:text-white dark:bg-slate-600"
          onClick={() => dispatch(removeStep())}
        >
          back
        </button>
        <Link to="/">
          <button
          onClick={() => {
            dispatch(initialStep())}
          }
            type="submit"
            className="text-white rounded-md bg-blue-500 w-[10rem] h-10 hover:bg-blue-700 cursor-pointer"
          >
            Back Home
          </button>
        </Link>
      </div>
    </>
  );
};

export default Confirmation;
