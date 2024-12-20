import { ReactNode } from "react";

export enum ContainerType {
  ImageOfItem = "item",
  ImageOfProductList = "productList",
}

export type ContainerProps = {
  children: ReactNode;
  containerType: ContainerType;
  handleClick?: () => void;
};
