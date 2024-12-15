import { ButtonProps } from "./button.types";
import styles from "./button.module.scss";

export function Button({ buttonLabel }: ButtonProps) {
  const buttonClass = `${styles.button} `;
  return <button className={buttonClass}>{buttonLabel}</button>;
}
