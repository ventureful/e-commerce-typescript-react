import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-start py-2 justify-center items-center">
      <div className="logo mx-10 my-3">
        <Image src="/images/logo1.png" alt="logo" width={200} height={50} />
      </div>
      <div className="nav">
        <ul className="flex items-center space-x-2 md:text-xl font-bold">
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

      <div className="cart absolute right-0 top-4 mx-5 ">
        <AiOutlineShoppingCart className="md:text-3xl text-2xl" />
      </div>
    </div>
  );
};

export default Navbar;
