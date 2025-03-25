import { ReactNode } from "react";
import { ProductListType } from "src/pages/Home/productList.types";

export type QuantityType = {
  id: number;
  qty: number;
};

export type CartItemType = {
  id: number;
  title: string;
  quantity: number;
  packageQty: number;
  price: number;
  imagePath: string;
};

export type CartItemsType = Array<CartItemType>;

export type GlobalContextType = {
  quantities: Array<QuantityType>;
  addToCart: (p: {
    id: number;
    title: string;
    price: number;
    description: string;
    imagePath: string;
  }) => void;
  handleIncrement: (id: number) => void;
  handleDecrement: (id: number) => void;
  handleIncrementCartItem: (id: number) => void;
  handleDecrementCartItem: (id: number) => void;
  removeItemFromCart: (id: number) => void;
  setQuantities: (quantities: Array<QuantityType>) => void;
  handleEmptyTheCart: () => void;
  cartItems: CartItemsType;
  products: ProductListType;
  imageToCart: boolean;
  handleImageToCart: () => void;
  resetImageToCart: () => void;
  userDiscountCode: string;
  userDiscountValue: number;
  message: string;
  setMessage: (input: string) => void;
  setUserDiscountValue: (discountValue: number) => void | null;
  setUserDiscountCode: (userInputCode: string) => void | null;
};

export type GlobalContextProviderProps = {
  children: ReactNode;
};
