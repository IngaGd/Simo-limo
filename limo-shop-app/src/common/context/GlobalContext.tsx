import { createContext } from "react";
import {
  GlobalContextProviderProps,
  GlobalContextType,
} from "./globalContext.types";
import { useHandleCart } from "../hooks/useHandleCart";
import { useHandleQuantity } from "../hooks/useHandleQuantity";
import { productList } from "src/assets/mok-data/productList";

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const { quantities, handleIncrement, handleDecrement, setQuantities } =
    useHandleQuantity(productList);
  const {
    addToCart,
    cartItems,
    removeItemFromCart,
    handleIncrementCartItem,
    handleDecrementCartItem,
  } = useHandleCart(quantities);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
