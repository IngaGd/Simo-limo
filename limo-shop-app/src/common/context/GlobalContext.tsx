import { createContext } from "react";
import {
  GlobalContextProviderProps,
  GlobalContextType,
} from "./globalContext.types";
import { useAddToCart } from "../hooks/useAddToCart";
import { useHandleQuantity } from "../hooks/useHandleQuantity";
import { productList } from "src/assets/mok-data/productList";

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const { quantities, handleIncrement, handleDecrement } =
    useHandleQuantity(productList);
  const { addToCart, cartItems } = useAddToCart(quantities);

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
