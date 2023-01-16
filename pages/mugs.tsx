/* eslint-disable security/detect-object-injection */
/* eslint-disable no-underscore-dangle */
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Product from "../models/Product";

type ProductsType = {
  _id: string;
  title: string;
  slug: string;
  desc: string;
  img: string;
  category: string;
  size: string[];
  color: string[];
  price: number;
  available: number;
};

type MugsType = {
  [key: string]: ProductsType;
};

type MugsProsType = {
  products: MugsType;
};

const Mugs: React.FC<MugsProsType> = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            {Object.keys(products).length === 0 && (
              <p>Sorry This Product is currently not avaliable</p>
            )}
            {Object.keys(products).map(item => (
              <div
                className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5"
                key={products[item]._id}
              >
                <Link href={`/product/${products[item].slug}`}>
                  <a className="block relative rounded overflow-hidden">
                    <Image
                      width={163}
                      height={100}
                      alt="ecommerce"
                      className="h-[24vh] m-auto md:h-[24vh] block"
                      src={products[item].img}
                    />
                  </a>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {products[item].category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {products[item].title}
                    </h2>
                    <p className="mt-1">₹ {products[item].price}</p>
                    {/* <div className="mt-1">
                      {products[item].size.includes("S") && (
                        <span className="border broder-gray-600 px-1 mx-1">
                          S
                        </span>
                      )}
                      {products[item].size.includes("M") && (
                        <span className="border broder-gray-600 px-1 mx-1">
                          M
                        </span>
                      )}
                      {products[item].size.includes("L") && (
                        <span className="border broder-gray-600 px-1 mx-1">
                          L
                        </span>
                      )}
                      {products[item].size.includes("XL") && (
                        <span className="border broder-gray-600 px-1 mx-1">
                          XL
                        </span>
                      )}
                      {products[item].size.includes("XXL") && (
                        <span className="border broder-gray-600 px-1 mx-1">
                          XXL
                        </span>
                      )}
                    </div>
                    <div className="flex mt-1">
                      {products[item].color.includes("red") && (
                        <span className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none" />
                      )}
                      {products[item].color.includes("blue") && (
                        <span className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none" />
                      )}
                      {products[item].color.includes("black") && (
                        <span className="border-2 border-gray-300 ml-1 bg-black-700 rounded-full w-6 h-6 focus:outline-none" />
                      )}
                      {products[item].color.includes("purple") && (
                        <span className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none" />
                      )}
                      {products[item].color.includes("yellow") && (
                        <span className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none" />
                      )}
                      {products[item].color.includes("white") && (
                        <span className="border-2 border-gray-300 ml-1 bg-white-700 rounded-full w-6 h-6 focus:outline-none" />
                      )}
                      {products[item].color.includes("gray") && (
                        <span className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none" />
                      )}
                    </div> */}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps = async () => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI || "");
  }

  const products = await Product.find({ category: "mugs" });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};

export default Mugs;
