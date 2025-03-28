import { MouseEventHandler, ReactNode } from "react";

export type ButtonProps = {
  colorMode: "dark" | "grey" | "white";
  buttonLabel: String;
  handleClick?: MouseEventHandler | undefined;
  children?: ReactNode;
};
