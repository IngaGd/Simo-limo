import { ReactNode } from "react";

export enum ContainerType {
  ImageOfItem = "item",
  ImageOfGroup = "group",
}

export type ContainerProps = {
  children: ReactNode;
  containerType: ContainerType;
};
