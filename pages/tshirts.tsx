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
  size: string;
  color: string;
  price: number;
  available: number;
};

type TshirtProsType = {
  products: ProductsType[];
};

const Tshirts: React.FC<TshirtProsType> = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            {products.map(product => (
              <div
                className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5"
                key={product._id}
              >
                <Link href={`/product/${product.slug}`}>
                  <a className="block relative rounded overflow-hidden">
                    <Image
                      width={163}
                      height={100}
                      alt="ecommerce"
                      className="h-[26vh] m-auto md:h-[26vh] block"
                      src={product.img}
                    />
                  </a>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {product.category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {product.title}
                    </h2>
                    <p className="mt-1">₹ {product.price}</p>
                    <p className="mt-1">{product.size}</p>
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

  const products = await Product.find({ category: "tshirts" });

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};

export default Tshirts;
