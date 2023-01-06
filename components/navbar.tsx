/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { AiFillCloseCircle, AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import useCartStore from "../hooks/useCartStore";
import CartItem from "./cartItem";

const OPEN_CART_CLASS = "translate-x-full";
const CLOSE_CART_CLASS = "translate-x-0";

const Navbar = () => {
  const { cart = {}, subTotal = 0, clearCart } = useCartStore();
  const cartRef = useRef<HTMLDivElement | null>(null);

  const toggleCart = () => {
    if (cartRef.current?.classList.contains(OPEN_CART_CLASS)) {
      cartRef.current?.classList.remove(OPEN_CART_CLASS);
      cartRef.current?.classList.add(CLOSE_CART_CLASS);
    } else if (!cartRef.current?.classList.contains(OPEN_CART_CLASS)) {
      cartRef.current?.classList.remove(CLOSE_CART_CLASS);
      cartRef.current?.classList.add(OPEN_CART_CLASS);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-start py-2 justify-center items-center shadow-md sticky top-0 bg-white z-10">
      <div className="logo mx-10 my-3">
        <Link href="/">
          <Image
            src="/images/warethecode-logo1.png"
            alt="logo"
            width={200}
            height={50}
          />
        </Link>
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-6 md:text-md font-bold">
          <Link href="/tshirts">
            <li>Tshirts</li>
          </Link>
          <Link href="/hoodies">
            <li>Hoodies</li>
          </Link>
          <Link href="/mugs">
            <li>Mugs</li>
          </Link>
        </ul>
      </div>

      <div
        onClick={toggleCart}
        className=" cursor-pointer cart absolute right-0 top-4 mx-5 "
      >
        <AiOutlineShoppingCart className="md:text-3xl text-2xl" />
      </div>

      <div
        ref={cartRef}
        className="sideCart  w-72 h-[100vh] overflow-auto absolute top-0 right-0 bg-purple-50 px-8 py-10 transform transition-transform translate-x-full"
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="cursor-pointer absolute top-2 right-2 text-lg"
        >
          <AiFillCloseCircle className="text-purple-500 text-lg" />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 ? (
            <div className="flex justify-center m-3">No items in the cart</div>
          ) : (
            Object.keys(cart)?.map((itemKey: string) => (
              <li key={itemKey}>
                <CartItem cart={cart[itemKey]} />
              </li>
            ))
          )}
        </ol>
        <div className="flex space-x-3 mb-3">
          <h3>SubTotal: </h3>
          <span>{subTotal}</span>
        </div>
        <div className="flex space-x-2">
          <Link
            href="/checkout"
            className="flex justify-center items-center text-white bg-purple-500 border-0 py-2 px-2 focus:outline-none hover:bg-purple-600 rounded text-sm"
          >
            <BsFillBagCheckFill className="mx-1" />
            Checkout
          </Link>
          <button
            type="button"
            onClick={clearCart}
            className="flex justify-center items-center text-white bg-purple-500 border-0 py-2 px-2 focus:outline-none hover:bg-purple-600 rounded text-sm"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
