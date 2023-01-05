/* eslint-disable security/detect-object-injection */
import React from "react";
import { UseStoreI } from "../types";
import useCart from "./useCart";

interface UseStoreProps {
  children: React.ReactNode;
}

const CartContext = React.createContext<UseStoreI | undefined>(undefined);

export const CartStoreProvide = ({ children }: UseStoreProps) => {
  const cart = useCart();

  return (
    <CartContext.Provider value={{ ...cart }}>{children}</CartContext.Provider>
  );
};

const useCartStore = () => {
  const context: UseStoreI | undefined = React.useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCartStore must be used within a CartStoreProvider");
  }

  return context;
};

export default useCartStore;
