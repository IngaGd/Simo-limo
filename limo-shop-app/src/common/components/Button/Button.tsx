import { ButtonProps } from "./button.types";
import styles from "./button.module.scss";

export function Button({ colorMode, buttonLabel, handleClick }: ButtonProps) {
  const buttonClass = `${styles.button} ${styles[`${colorMode}`]}`;

  return (
    <button className={buttonClass} onClick={handleClick}>
      {buttonLabel}
    </button>
  );
}
