/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useMemo, useState } from "react";
import Link from "next/link";
import useCartStore from "../hooks/useCartStore";
import CartItem from "../components/cartItem";

const checkoutInitialData = {
  name: "",
  email: "",
  address: "",
  phone: "",
  pincode: "",
  city: "Virar",
  state: "Maharashtra",
};

const Checkout = () => {
  const [checkoutDetails, setCheckoutDetails] = useState(checkoutInitialData);
  const { cart, subTotal } = useCartStore();

  const handleChangeCheckoutDetails = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCheckoutDetails(preValue => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const isPayDisable = useMemo(
    () =>
      !!(
        checkoutDetails.name === "" &&
        checkoutDetails.email === "" &&
        checkoutDetails.address === "" &&
        checkoutDetails.phone === "" &&
        checkoutDetails.pincode === ""
      ),
    [
      checkoutDetails.name,
      checkoutDetails.email,
      checkoutDetails.address,
      checkoutDetails.phone,
      checkoutDetails.pincode,
    ]
  );

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
            value={checkoutDetails.name}
            onChange={handleChangeCheckoutDetails}
            type="name"
            id="name"
            name="name"
            className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="px-2 mb-4 w-full md:w-1/2">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            value={checkoutDetails.email}
            onChange={handleChangeCheckoutDetails}
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
            value={checkoutDetails.address}
            onChange={handleChangeCheckoutDetails}
            rows={2}
            className="w-full resize-none bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="mx-auto flex flex-wrap my-2">
        <div className="px-2 mb-4 w-full md:w-1/2">
          <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
            Phone No.
          </label>
          <input
            value={checkoutDetails.phone}
            onChange={handleChangeCheckoutDetails}
            type="text"
            id="phone"
            name="phone"
            className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="px-2 mb-4 w-full md:w-1/2">
          <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
            Pincode
          </label>
          <input
            value={checkoutDetails.pincode}
            onChange={handleChangeCheckoutDetails}
            type="text"
            id="pincode"
            name="pincode"
            className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="px-2 mb-4 w-full md:w-1/2">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">
            City
          </label>
          <input
            type="text"
            id="city"
            value={checkoutDetails.city}
            readOnly
            name="city"
            className="w-full bg-gray-50 rounded border border-gray-300  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="px-2 mb-4 w-full md:w-1/2">
          <label htmlFor="state" className="leading-7 text-sm text-gray-600">
            State
          </label>
          <input
            type="text"
            id="state"
            value={checkoutDetails.state}
            readOnly
            name="state"
            className="w-full bg-gray-50 rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
      <Link href="/order">
        <button
          type="button"
          disabled={isPayDisable}
          className="disabled:bg-purple-300 flex w-1/2 m-auto md:m-0 md:w-[6vw] justify-center items-center text-white bg-purple-500 border-0 py-2 px-2 focus:outline-none hover:bg-purple-600 rounded text-sm"
        >
          Pay
        </button>
      </Link>
    </div>
  );
};

export default Checkout;
