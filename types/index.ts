export type addToCartStateType = {
  itemCode: string;
  qty: number;
  price: number;
  name: string;
  size: string;
  variant: string;
};

export type cartStateType = {
  [key: string]: addToCartStateType;
};

export type addToCartType = (item: addToCartStateType) => void;
export type buyNowType = (item: addToCartStateType) => void;

export type removeFromCartType = (itemCode: string) => void;

export interface UseStoreI {
  cart: cartStateType;
  subTotal: number;
  addToCart: addToCartType;
  buyNow: buyNowType;
  clearCart: () => void;
  removeFromCart: (itemCode: string) => void;
}
