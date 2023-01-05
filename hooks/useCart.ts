/* eslint-disable security/detect-object-injection */
import { useCallback, useEffect, useState } from "react";
import { addToCartType, cartStateType, removeFromCartType } from "../types";

const useCart = () => {
  const [cart, setCart] = useState<cartStateType>({});
  const [subTotal, setSubTotal] = useState(0);

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

  const findTotal: () => number = useCallback(() => {
    const availbleCartItems = { ...cart };
    const availbleCartItemKey = Object.keys(cart);
    let total = 0;
    availbleCartItemKey.forEach(key => {
      total += availbleCartItems[key].price * availbleCartItems[key].qty;
    });

    return total;
  }, [cart]);

  useEffect(() => {
    if (Object.keys(cart).length > 0) {
      const total = findTotal();
      setSubTotal(total);
    }
  }, [findTotal, cart]);

  const saveCart = useCallback(
    (newCart: cartStateType) => {
      localStorage.setItem("cart", JSON.stringify(newCart));
      const total = findTotal();
      setSubTotal(total);
    },
    [findTotal]
  );

  const addToCart: addToCartType = useCallback(
    cartItem => {
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

      setCart(availbleCartItems);
      saveCart(availbleCartItems);
    },
    [cart, saveCart]
  );

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

  return { cart, subTotal, addToCart, clearCart, removeFromCart };
};

export default useCart;
