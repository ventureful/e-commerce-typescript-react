/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { addToCartStateType } from "../types";
import useCartStore from "../hooks/useCartStore";

interface CartItemProps {
  cart: addToCartStateType;
  isCheckout?: boolean;
}

const CartItem = ({ cart, isCheckout }: CartItemProps) => {
  const { addToCart, removeFromCart } = useCartStore();
  return (
    <div className="item flex my-5">
      <div className={`${!isCheckout && "w-2/3"} font-semibold`}>
        {cart?.name || "-"} ({cart?.size}/{cart?.variant})
      </div>
      <div className="w-1/3 font-semibold flex items-center justify-center">
        <span
          className="cursor-pointer mx-2"
          onClick={() => addToCart({ ...cart, qty: 1 })}
        >
          <AiFillPlusCircle className="text-purple-500 text-lg" />
        </span>
        <span className="text-sm">{cart?.qty || "-"}</span>
        <span
          className="cursor-pointer mx-2"
          onClick={() => removeFromCart(cart?.itemCode || "")}
        >
          <AiFillMinusCircle className="text-purple-500 text-lg" />
        </span>
      </div>
    </div>
  );
};
CartItem.defaultProps = {
  isCheckout: false,
};
export default CartItem;
