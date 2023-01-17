import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import mongoose from "mongoose";
import OrderModal from "../models/Order";

const Orders = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("warethecode-login-token")) router.push("/");
  }, []);

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="font-semibold text-center text-2xl mt-10">My Orders</h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        First
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Last
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Handle
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        1
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        Mark
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        Otto
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        @mdo
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI || "");
  }

  const orders = await OrderModal.find({ user: context.query.id });

  return {
    props: { orders },
  };
};

export default Orders;
