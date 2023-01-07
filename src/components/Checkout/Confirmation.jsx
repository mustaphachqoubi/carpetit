import { useEffect } from "react";
import { done, error, warning } from "../../assets/index";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setConfirmationLoading } from "../../redux/CheckoutReducers/confirmationLoading";
import { setreferenceLoading } from "../../redux/CheckoutReducers/referenceLoading";
import { setThankMessageLoading } from "../../redux/CheckoutReducers/thankMessageLoading";

const Confirmation = ({ }) => {
  const { shippingData } = useSelector(state => state.shippingData)
  const {order} = useSelector(state => state.order)
  const {confirmationLoading} = useSelector(state => state.confirmationLoading)
  const {referenceLoading} = useSelector(state => state.referenceLoading)
  const {thankMessageLoading} = useSelector(state => state.thankMessageLoading)

  const dispatch = useDispatch()
    
    const handleConfirmationLoad = async () => {
      const or = await order
      setTimeout(function () {
        dispatch(setConfirmationLoading(
          <img
            className="w-12"
            src={or && shippingData.firstName ? done : error}
            alt="done"
          />
        ));
      }, 5000)
    };
  
    const handleReferenceLoad = async () => {
      const or = await order
      dispatch(setreferenceLoading(
        or && shippingData.firstName ? (
          or.customer_reference
        ) :  (
          <img className="w-10" src={warning} />
        )
      ));
    };
  
    const handlethankMessageLoad = async () => {
      const or = await order
      setTimeout(function () {
        dispatch(setThankMessageLoading(
          or && shippingData.firstName ? (
            <h1 className="text-sm">Thank you Mr. {shippingData.firstName}</h1>
          ) : (
            <h1 className="text-sm">There is an error, Please try again !</h1>
          )
        ));
      }, 5000)
    };
  
    useEffect(() => {
      handleConfirmationLoad();
      handleReferenceLoad();
      handlethankMessageLoad()
    }, [order]);
  
    return (
      <>
        <div className="flex justify-center">
          <div className="flex flex-col p-8 items-center space-y-4">
            <div className="flex items-center">
              <h1 className="font-bold">CONFIRMED</h1>
              {confirmationLoading}
            </div>
            <h1 className="text-sm flex items-center">
              order_reference: {referenceLoading}
            </h1>
            {thankMessageLoading}
          </div>
        </div>
        <div className="p-8 flex justify-center">
          <Link to="/">
            <button
              type="submit"
              className="text-white rounded-md bg-blue-500 w-[10rem] h-10 hover:bg-blue-700 cursor-pointer"
              disabled={!order.customer_reference}
            >
              Back Home
            </button>
          </Link>
        </div>
      </>
    );
  };

  export default Confirmation
