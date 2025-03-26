import { ReactNode } from "react";

export enum ContainerType {
  ImageOfItem = "item",
  ImageOfProductList = "productList",
  ImageOfCart = "cartItem",
  ImageOfCartMob = "cartItemMob",
  ImageOfChechout = "checkoutItem",
}

export type ContainerProps = {
  children: ReactNode;
  containerType: ContainerType;
  handleClick?: () => void;
};
