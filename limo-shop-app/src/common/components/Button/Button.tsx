import { ButtonProps } from "./button.types";
import styles from "./button.module.scss";

export function Button({ buttonLabel, handleClick }: ButtonProps) {
  const buttonClass = `${styles.button}`;

  return (
    <button className={buttonClass} onClick={handleClick}>
      {buttonLabel}
    </button>
  );
}
