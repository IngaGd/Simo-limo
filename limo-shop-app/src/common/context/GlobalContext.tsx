import { createContext } from "react";
import {
  GlobalContextProviderProps,
  GlobalContextType,
} from "./globalContext.types";
import { useHandleCart } from "../hooks/useHandleCart";
import { useHandleQuantity } from "../hooks/useHandleQuantity";
import { useHandleProductList } from "../hooks/useHandleProductList";
import { useImageToCart } from "../hooks/useImageToCart";

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const { products } = useHandleProductList();
  const { quantities, handleIncrement, handleDecrement, setQuantities } =
    useHandleQuantity(products);
  const {
    addToCart,
    cartItems,
    removeItemFromCart,
    handleIncrementCartItem,
    handleDecrementCartItem,
    handleEmptyTheCart,
  } = useHandleCart(quantities);
  const { imageToCart, handleImageToCart, resetImageToCart } = useImageToCart();

  return (
    <GlobalContext.Provider
      value={{
        quantities,
        handleIncrement,
        handleDecrement,
        addToCart,
        cartItems,
        removeItemFromCart,
        setQuantities,
        handleIncrementCartItem,
        handleDecrementCartItem,
        handleEmptyTheCart,
        products,
        handleImageToCart,
        imageToCart,
        resetImageToCart,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
