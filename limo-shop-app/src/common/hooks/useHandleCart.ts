import { useEffect, useState } from "react";
import { CartItemsType } from "../context/globalContext.types";

export function useHandleCart(quantities: { id: number; qty: number }[]) {
  const [cartItems, setCartItems] = useState<CartItemsType>([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    if (cartItems) {
      setCartItems(cartItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (p: {
    id: number;
    title: string;
    price: number;
    description: string;
    imagePath: string;
  }) => {
    const cartItemQantity =
      quantities.find((element) => element.id === p.id)?.qty || 1;
    const cartItemExist = cartItems.find((element) => element.id === p.id);

    if (cartItemExist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === p.id
            ? {
                ...cartItemExist,
                quantity: cartItemExist.quantity + cartItemQantity,
              }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        {
          id: p.id,
          title: p.title,
          quantity: cartItemQantity,
          price: Number(p.price),
        },
      ]);
    }
  };

  const removeItemFromCart = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((element) => element.id != id)
    );
  };

  const handleIncrementCartItem = (id: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      })
    );
  };

  const handleDecrementCartItem = (id: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      })
    );
  };

  const handleEmptyTheCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    addToCart,
    removeItemFromCart,
    handleIncrementCartItem,
    handleDecrementCartItem,
    handleEmptyTheCart,
  };
}
