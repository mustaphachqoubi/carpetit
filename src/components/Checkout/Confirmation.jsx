import { useEffect } from "react";
import { done, error, warning } from "../../assets/index";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setConfirmationLoading } from "../../redux/CheckoutReducers/confirmationLoading";
import { setreferenceLoading } from "../../redux/CheckoutReducers/referenceLoading";
import { setThankMessageLoading } from "../../redux/CheckoutReducers/thankMessageLoading";
import { removeStep } from "../../redux/CheckoutReducers/step";
const Confirmation = ({}) => {
  const { shippingData } = useSelector((state) => state.shippingData);
  const { order } = useSelector((state) => state.order);
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
          <img
            className="w-12"
            src={referenceLoading?.length >= 1 ? done : error}
            alt="done"
          />
        )
      );
    }, 5000);
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
          <div className="flex items-center">
            <h1 className="font-bold">CONFIRMED</h1>
            {confirmationLoading
              ? confirmationLoading
              : "it's seems there is an error"}
          </div>
          <h1 className="text-sm flex items-center">
            order_reference: {referenceLoading}
          </h1>
          <div className="text-center">{thankMessageLoading}</div>
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
