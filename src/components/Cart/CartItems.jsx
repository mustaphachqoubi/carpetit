import React from "react";
import { FiTrash } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { setTrashId, setTrashInitial } from "../../redux/CartReducers/trash";
import { setPlusId, setPlusInitial } from "../../redux/CartReducers/plus";
import { setMinesId, setMinesInitial } from "../../redux/CartReducers/mines";

const CartItems = ({ cart, handleUpdateQt, handleRemoveFromCart }) => {
  const { trash } = useSelector((state) => state.trash);
  const { plus } = useSelector((state) => state.plus);
  const { mines } = useSelector((state) => state.mines);

  const dispatch = useDispatch();

  const handleClickedTrash = (id) => {
    dispatch(setTrashId(id));
    setTimeout(function () {
      dispatch(setTrashInitial());
    }, 2000);
    handleRemoveFromCart(id);
  };

  const handleClickedPlus = (id, quantity) => {
    dispatch(setPlusId(id));
    setTimeout(function () {
      dispatch(setPlusInitial());
    }, 1600);
    handleUpdateQt(id, quantity + 1);
  };

  const handleClickedMines = (id, quantity) => {
    dispatch(setMinesId(id));
    setTimeout(function () {
      dispatch(setMinesInitial());
    }, 1600);
    handleUpdateQt(id, quantity - 1);
  };

  return (
    <>
      {cart?.line_items?.map((Product) => (
        <div
          className="shrink-0 cursor-pointer w-[18rem] sm:max-w-sm"
          key={Product.id}
        >
          <div className="relative">
            <div className="absolute bottom-[1.2rem] text-white left-[1rem] bg-gradient-to-r from-green-500 to-green-600 self-start flex items-center justify-center h-10 px-5 rounded-lg font-bold ">
              {Product?.price?.formatted_with_symbol}
            </div>
            <img
              src={Product?.image?.url ? Product?.image?.url : ""}
              className="object-cover h-[18em] w-80 rounded-xl select-none"
            />
            <div
              onClick={() => handleClickedTrash(Product?.id)}
              className={`absolute bg-red-500 text-white hover:bg-red-700 right-[1rem] bottom-[1rem] p-4 text-xl rounded-full`}
            >
              {trash === Product?.id ? (
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
              ) : (
                <FiTrash />
              )}
            </div>
          </div>

          <div className="flex justify-between py-4">
            <div>
              <h3 className="dark:text-white font-bold text-xl">
                {Product?.selected_options.map((option) => option.option_name)}
              </h3>
            </div>

            <div className="flex justify-around items-center text-slate-700 dark:text-white">
              <button
                onClick={() =>
                  handleClickedPlus(Product?.id, Product?.quantity)
                }
                className="font-semibold text-slate-400 hover:text-white hover:text-slate-500 hover:bg-slate-200 hover:dark:bg-slate-700 hover:dark:text-white px-4 rounded-sm "
              >
                {plus === Product?.id ? (
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
                ) : (
                  "+"
                )}
              </button>
              <h3 className="font-semibold px-2">{Product?.quantity}</h3>
              <button
                onClick={() =>
                  handleClickedMines(Product?.id, Product?.quantity)
                }
                className="font-semibold text-slate-400 hover:text-white hover:text-slate-500 hover:bg-slate-200 hover:dark:bg-slate-700 hover:dark:text-white px-4 rounded-sm "
              >
                {mines === Product.id ? (
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
                ) : (
                  "-"
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItems;
