import { ReactNode } from "react";

export type QuantityType = {
  id: number;
  qty: number;
};

export type CartItemType = {
  id: number;
  title: string;
  quantity: number;
  totalPrice: number;
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
  removeItemFromCart: (id: number) => void;
  cartItems: CartItemsType;
};

export type GlobalContextProviderProps = {
  children: ReactNode;
};
