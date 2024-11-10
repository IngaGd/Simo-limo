import { ButtonProps } from "./button.types";
import styles from "./button.module.scss";

export default function Button({ text }: ButtonProps) {
  const buttonClass = `${styles.button} `;
  return <button className={buttonClass}>{text}</button>;
}
