/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";
import Link from "next/link";
import useCartStore from "../hooks/useCartStore";
import CartItem from "../components/cartItem";

const Checkout = () => {
  const { cart, subTotal } = useCartStore();
  return (
    <div className="container m-auto">
      <h1 className="font-bold text-2xl my-8 text-center">Checkout</h1>
      <h2 className="font-bold text-xl mx-2 md:mx-0">Delivery Details</h2>
      <div className="mx-auto flex flex-wrap my-2">
        <div className="px-2 mb-4 w-full md:w-1/2">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">
            Name
          </label>
          <input
            type="name"
            id="name"
            name="name"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="px-2 mb-4 w-full md:w-1/2">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="mx-auto flex flex-wrap my-2">
        <div className="px-2 mb-4 w-full">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            className="w-full resize-none bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="mx-auto flex flex-wrap my-2">
        <div className="px-2 mb-4 w-full md:w-1/2">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
            Phone No.
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="px-2 mb-4 w-full md:w-1/2">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="px-2 mb-4 w-full md:w-1/2">
          <label htmlFor="state" className="leading-7 text-sm text-gray-600">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="px-2 mb-4 w-full md:w-1/2">
          <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <h2 className="font-bold text-xl mx-2 my-2 md:mx-0">
        Review Cart Items and Pay
      </h2>
      <div className="sideCart my-2 py-0 md:py-5">
        <ol className="list-decimal ml-7 md:ml-4 font-semibold">
          {Object.keys(cart).length === 0 ? (
            <div className="flex justify-center m-3">No items in the cart</div>
          ) : (
            Object.keys(cart)?.map((itemKey: string) => (
              <li key={itemKey}>
                <CartItem isCheckout cart={cart[itemKey]} />
              </li>
            ))
          )}
        </ol>
        <div className="flex font-bold space-x-3 ml-3 md:ml-0 mb-3">
          <h3>Total: </h3>
          <span className="text-purple-500">{subTotal} ₹</span>
        </div>
      </div>
      <Link
        href="/order"
        className="flex w-1/2 m-auto md:m-0 md:w-[6vw] justify-center items-center text-white bg-purple-500 border-0 py-2 px-2 focus:outline-none hover:bg-purple-600 rounded text-sm"
      >
        Pay
      </Link>
    </div>
  );
};

export default Checkout;
