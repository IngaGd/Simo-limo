import { useContext, useEffect, useState } from "react";
import { CartItemsType } from "../context/globalContext.types";
import { GlobalContext } from "../context/GlobalContext";

export function useHandleCart(quantities: { id: number; qty: number }[]) {
  const [cartItems, setCartItems] = useState<CartItemsType>([]);
  // const { setQuantities } = useContext(GlobalContext);

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
      quantities.find((element) => element.id === p.id)?.qty || 0;
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
          totalPrice: cartItemQantity * Number(p.price),
        },
      ]);
    }
    // setQuantities({ qty: 0 });
  };

  const removeItemFromCart = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((element) => element.id != id)
    );
  };

  return { cartItems, addToCart, removeItemFromCart };
}
