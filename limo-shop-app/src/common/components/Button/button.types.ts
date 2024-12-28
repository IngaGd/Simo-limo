import { MouseEventHandler } from "react";

export type ButtonProps = {
  buttonLabel: String;
  handleClick?: MouseEventHandler | undefined;
};
