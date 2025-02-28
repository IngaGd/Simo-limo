import { createContext } from "react";
import {
  GlobalContextProviderProps,
  GlobalContextType,
} from "./globalContext.types";
import { useHandleCart } from "../hooks/useHandleCart";
import { useHandleQuantity } from "../hooks/useHandleQuantity";
import { useHandleProductList } from "../hooks/useHandleProductList";

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
