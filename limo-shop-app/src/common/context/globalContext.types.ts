import { ReactNode } from "react";

export type GlobalContextType = {
  quantity: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
};

export type GlobalContextProviderProps = {
  children: ReactNode;
};
