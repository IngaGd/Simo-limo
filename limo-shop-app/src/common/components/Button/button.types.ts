import { MouseEventHandler, ReactNode } from "react";

export type ButtonProps = {
  buttonLabel: String;
  handleClick?: MouseEventHandler | undefined;
  children?: ReactNode;
};
