import { ButtonProps } from "./button.types";
import styles from "./buttonSecond.module.scss";

export default function ButtonSecond({ text }: ButtonProps) {
  const buttonClass = `${styles.button} `;
  return <button className={buttonClass}>{text}</button>;
}
