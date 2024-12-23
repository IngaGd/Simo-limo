import { createContext } from "react";
import {
  GlobalContextProviderProps,
  GlobalContextType,
} from "./globalContext.types";
import { useAddToCart } from "../hooks/useAddToCart";
import { useHandleQuantity } from "../hooks/useHandleQuantity";

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const { quantities, handleIncrement, handleDecrement } = useHandleQuantity();
  const { addToCart, cartItems } = useAddToCart();

  return (
    <GlobalContext.Provider
      value={{
        quantities,
        handleIncrement,
        handleDecrement,
        addToCart,
        cartItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
