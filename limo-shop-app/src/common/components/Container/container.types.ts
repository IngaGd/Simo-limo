import { ReactNode } from "react";

export enum ContainerType {
  ImageOfItem = "item",
  ImageOfProductList = "productList",
  ImageOfCart = "cartItem",
}

export type ContainerProps = {
  children: ReactNode;
  containerType: ContainerType;
  handleClick?: () => void;
};
