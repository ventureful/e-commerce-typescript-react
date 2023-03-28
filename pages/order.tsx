import React from "react";
import useCartStore from "../hooks/useCartStore";

const Order = () => {
  const { cart, subTotal } = useCartStore();
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              WARETHECODE.com
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
              Order Id: #8977
            </h1>
            <div className="flex mb-4">
              <a className="flex-grow py-2 text-lg px-1">Name</a>
              <a className="flex-grow py-2 text-lg px-1">Quantity</a>
              <a className="flex-grow py-2 text-lg px-1">Price</a>
            </div>
            {Object.keys(cart).map(itemCode => (
              <div
                className="flex border-t border-gray-200 py-2"
                key={itemCode}
              >
                <span className="text-gray-500">{cart[itemCode].name}</span>
                <span className="mx-auto text-gray-900">
                  {cart[itemCode].qty}
                </span>
                <span className="mx-auto text-gray-900">
                  {cart[itemCode].price * cart[itemCode].qty}
                </span>
              </div>
            ))}

            <div className="flex my-5">
              <span className="title-font font-medium text-2xl">
                Total: <span className="text-purple-500">{subTotal}₹</span>
              </span>
              <button
                type="button"
                className="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded"
              >
                Track Order
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://dummyimage.com/400x400"
          />
        </div>
      </div>
    </section>
  );
};

export default Order;
