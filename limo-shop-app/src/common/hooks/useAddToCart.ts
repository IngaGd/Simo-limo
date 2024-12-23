import { useState } from "react";
import { CartItemsType } from "../context/globalContext.types";

export function useAddToCart(quantities: { id: number; qty: number }[]) {
  const [cartItems, setCartItems] = useState<CartItemsType>([]);
  const addToCart = (p: {
    id: number;
    title: string;
    price: number;
    description: string;
    imagePath: string;
  }) => {
    const cartItemQantity =
      quantities.find((element) => element.id === p.id)?.qty || 0;
    setCartItems((prevItems) => [
      ...prevItems,
      {
        id: p.id,
        title: p.title,
        quantity: cartItemQantity,
        totalPrice: cartItemQantity * Number(p.price),
      },
    ]);
  };

  return { cartItems, addToCart };
}
