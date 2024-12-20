import { createContext, useState } from "react";
import {
  GlobalContextProviderProps,
  GlobalContextType,
} from "./globalContext.types";

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <GlobalContext.Provider
      value={{ quantity, handleIncrement, handleDecrement }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
