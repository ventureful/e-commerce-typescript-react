/* eslint-disable security/detect-object-injection */
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import {
  addToCartType,
  buyNowType,
  cartStateType,
  removeFromCartType,
} from "../types";

const useCart = () => {
  const [cart, setCart] = useState<cartStateType>({});
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart") || "{}"));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      localStorage.clear();
    }
  }, []);

  const findTotal: (newCart: cartStateType) => number = useCallback(newCart => {
    const availbleCartItems = { ...newCart };
    const availbleCartItemKey = Object.keys(newCart);
    let total = 0;
    if (availbleCartItemKey.length > 0) {
      availbleCartItemKey.forEach(key => {
        total += availbleCartItems[key].price * availbleCartItems[key].qty;
      });
    }

    return total;
  }, []);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      const total = findTotal(cart);
      setSubTotal(total);
    }
  }, [findTotal, cart]);

  const saveCart = useCallback(
    (newCart: cartStateType) => {
      localStorage.setItem("cart", JSON.stringify(newCart));
      const total = findTotal(newCart);
      setSubTotal(total);
    },
    [findTotal]
  );

  const addToCart: addToCartType = useCallback(
    cartItem => {
      if (!cartItem?.itemCode || !cartItem?.size || !cartItem?.variant) return;

      const availbleCartItems = { ...cart };
      const availbleCartItemKey = Object.keys(cart);
      const cartAlreadyPresent =
        availbleCartItemKey.find(item => item === cartItem.itemCode) ||
        undefined;
      if (cartAlreadyPresent) {
        availbleCartItems[cartAlreadyPresent].qty += cartItem.qty;
      } else {
        availbleCartItems[cartItem.itemCode] = cartItem;
      }
      toast.success("Added to cart", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
      setCart(availbleCartItems);
      saveCart(availbleCartItems);
    },
    [cart, saveCart]
  );

  const buyNow: buyNowType = cartItem => {
    if (!cartItem?.itemCode || !cartItem?.size || !cartItem?.variant) return;

    const buyNowItem = { [cartItem.itemCode]: { ...cartItem } };
    setCart(buyNowItem);
    saveCart(buyNowItem);

    router.push("/checkout");
  };

  const removeFromCart: removeFromCartType = useCallback(
    itemCode => {
      const availbleCartItems = { ...cart };
      if (availbleCartItems[itemCode] && availbleCartItems[itemCode].qty > 1) {
        availbleCartItems[itemCode].qty -= 1;
      } else if (
        availbleCartItems[itemCode] &&
        availbleCartItems[itemCode].qty === 1
      ) {
        delete availbleCartItems[itemCode];
      }

      setCart(availbleCartItems);
      saveCart(availbleCartItems);
    },
    [cart, saveCart]
  );

  const clearCart = useCallback(() => {
    setCart({});
    saveCart({});
    setSubTotal(0);
  }, [saveCart]);

  return { cart, subTotal, addToCart, clearCart, removeFromCart, buyNow };
};

export default useCart;
