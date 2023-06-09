/* eslint-disable security/detect-object-injection */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import mongoose from "mongoose";
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useCartStore from "../../hooks/useCartStore";
import usePinCode, { usePinCodeT } from "../../hooks/usePinCode";
import ProductModal from "../../models/Product";
import { colorSizeSlug } from "../api/getproducts";

type ProductType = {
  _id: string;
  title: string;
  slug: string;
  desc: string;
  img: string;
  category: string;
  size: string;
  color: string;
  price: number;
  available: number;
};
type slugType = {
  [key: string]: string;
};
type sizeType = {
  [key: string]: slugType;
};
type colorSizeSlugType = {
  [key: string]: sizeType;
};

type ProductProps = {
  product: ProductType;
  variants: ProductType[];
  colorSizeSlugs: colorSizeSlugType;
};

const Product: React.FC<ProductProps> = ({
  product,
  colorSizeSlugs,
  variants,
}) => {
  const {
    pinCode,
    checkServiceAvailbilty,
    onChangePin,
    serviceTextColor,
    serviceText,
  }: usePinCodeT = usePinCode();
  const { addToCart, buyNow } = useCartStore();
  const [diplayedProduct, setDisplayedProduct] = useState({
    itemCode: product.slug,
    qty: 1,
    price: product.price,
    name: product.title,
    size: product.size,
    variant: product.color,
  });
  // const router = useRouter();

  useEffect(() => {
    try {
      if (localStorage.getItem("displayedProduct")) {
        setDisplayedProduct(
          JSON.parse(localStorage.getItem("displayedProduct") || "{}")
        );
      }
    } catch (error) {
      // console.error("error", error);
      localStorage.clear();
    }

    return () => {
      localStorage.removeItem("displayedProduct");
    };
  }, []);

  // useEffect(() => {
  //   if (router.query.slug !== diplayedProduct.itemCode) {
  //     const url = `${process.env.NEXT_PUBLIC_HOST}/product/${diplayedProduct.itemCode}`;
  //     const win: Window = window;
  //     win.location = url;
  //   }
  // }, [diplayedProduct.itemCode, router.query.slug]);

  const refreshPage: (key: string, value: string) => void = (key, value) => {
    setDisplayedProduct(prevProduct => {
      if (key === "variant") {
        const size = Object.keys(colorSizeSlugs[value]).includes(
          prevProduct.size
        )
          ? prevProduct.size
          : Object.keys(colorSizeSlugs[value])[0];

        const itemCode = colorSizeSlugs[value][size].slug;

        const { price } = variants.find(v => v.slug === itemCode) || {
          price: prevProduct.price,
        };

        localStorage.setItem(
          "displayedProduct",
          JSON.stringify({
            ...prevProduct,
            [key]: value,
            price,
            size,
            itemCode,
          })
        );

        return {
          ...prevProduct,
          [key]: value,
          price,
          size,
          itemCode,
        };
      }

      const itemCode = colorSizeSlugs[prevProduct.variant][value].slug;
      const { price } = variants.find(v => v.slug === itemCode) || {
        price: prevProduct.price,
      };

      localStorage.setItem(
        "displayedProduct",
        JSON.stringify({
          ...prevProduct,
          [key]: value,
          price,
          itemCode,
        })
      );

      return {
        ...prevProduct,
        [key]: value,
        price,
        itemCode,
      };
    });
  };

  return (
    <div>
      <ToastContainer />
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-16 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto px-25 object-cover object-top rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                CODESWARE.com
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {diplayedProduct.name} ({diplayedProduct.size || "Select size"}/
                {diplayedProduct.variant})
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-purple-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-purple-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-purple-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-purple-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-purple-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(colorSizeSlugs).includes("red") && (
                    <span
                      onClick={() => refreshPage("variant", "red")}
                      className={`border-2 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${
                        diplayedProduct.variant === "red"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                  {Object.keys(colorSizeSlugs).includes("blue") && (
                    <span
                      onClick={() => refreshPage("variant", "blue")}
                      className={`border-2 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${
                        diplayedProduct.variant === "blue"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                  {Object.keys(colorSizeSlugs).includes("black") && (
                    <span
                      onClick={() => refreshPage("variant", "black")}
                      className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${
                        diplayedProduct.variant === "black"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                  {Object.keys(colorSizeSlugs).includes("purple") && (
                    <span
                      onClick={() => refreshPage("variant", "purple")}
                      className={`border-2 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none ${
                        diplayedProduct.variant === "purple"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                  {Object.keys(colorSizeSlugs).includes("yellow") && (
                    <span
                      onClick={() => refreshPage("variant", "yellow")}
                      className={`border-2 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none ${
                        diplayedProduct.variant === "yellow"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                  {Object.keys(colorSizeSlugs).includes("white") && (
                    <span
                      onClick={() => refreshPage("variant", "white")}
                      className={`border-2 ml-1 bg-white-700 rounded-full w-6 h-6 focus:outline-none ${
                        diplayedProduct.variant === "white"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                  {Object.keys(colorSizeSlugs).includes("gray") && (
                    <span
                      onClick={() => refreshPage("variant", "gray")}
                      className={`border-2 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none ${
                        diplayedProduct.variant === "gray"
                          ? "border-black"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      onChange={e => refreshPage("size", e.target.value)}
                      value={diplayedProduct.size}
                      className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-500 text-base pl-3 pr-10"
                    >
                      <option value="">Select Size</option>
                      {Object.keys(
                        colorSizeSlugs[diplayedProduct.variant]
                      ).includes("S") && <option value="S">S</option>}
                      {Object.keys(
                        colorSizeSlugs[diplayedProduct.variant]
                      ).includes("M") && <option value="M">M</option>}
                      {Object.keys(
                        colorSizeSlugs[diplayedProduct.variant]
                      ).includes("L") && <option value="L">L</option>}
                      {Object.keys(
                        colorSizeSlugs[diplayedProduct.variant]
                      ).includes("XL") && <option value="XL">XL</option>}
                      {Object.keys(
                        colorSizeSlugs[diplayedProduct.variant]
                      ).includes("XXL") && <option value="XXL">XXL</option>}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-xl md:text-2xl text-gray-900">
                  {diplayedProduct.price} ₹
                </span>
                <button
                  type="button"
                  onClick={() => buyNow(diplayedProduct)}
                  className="flex ml-4 md:ml-8 text-white bg-purple-500 border-0 py-2 px-2 text-sm md:text-lg md:px-6 focus:outline-none hover:bg-purple-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  className="flex ml-4 text-white bg-purple-500 border-0 py-2 px-2  text-sm md:text-lg  md:px-6 focus:outline-none hover:bg-purple-600 rounded"
                  onClick={() => addToCart(diplayedProduct)}
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                >
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>
              <div className="pincode mt-6 flex space-x-2 text-sm">
                <input
                  className="px-2 border-2 border-gray-400 rounded-md outline-none"
                  type="text"
                  placeholder="Enter Pincode"
                  value={pinCode}
                  onChange={onChangePin}
                />
                <button
                  type="button"
                  onClick={checkServiceAvailbilty}
                  className="flex ml-4 md:ml-14 text-white bg-purple-500 border-0 p-2 md:px-6 focus:outline-none hover:bg-purple-600 rounded"
                >
                  Check
                </button>
              </div>
              <span className={`text-sm ${serviceTextColor}`}>
                {serviceText}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps = async (context: {
  query: { slug: string };
}) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI || "");
  }

  const product = await ProductModal.findOne({ slug: context.query.slug });
  const variants = await ProductModal.find({
    title: product.title,
    category: product.category,
  });
  const colorSizeSlugs = colorSizeSlug(variants);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      colorSizeSlugs: JSON.parse(JSON.stringify(colorSizeSlugs)),
      variants: JSON.parse(JSON.stringify(variants)),
    },
  };
};
export default Product;
