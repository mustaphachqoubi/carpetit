import React from "react";
import { useDispatch } from "react-redux";
import { setTrashId, setTrashInitial } from "../../redux/CartReducers/trash";
import { setPlusId, setPlusInitial } from "../../redux/CartReducers/plus";
import { setMinesId, setMinesInitial } from "../../redux/CartReducers/mines";
import CartItem from "./CartItem";

const CartItems = ({ cart, handleUpdateQt, handleRemoveFromCart }) => {

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
        <CartItem 
        handleClickedTrash={handleClickedTrash}
        handleClickedPlus={handleClickedPlus}
        handleClickedMines={handleClickedMines}
        cart={cart}
        />
    </>
  );
};

export default CartItems;
