import styles from "./text.module.scss";
import { TextProps } from "./text.types";

export function Text({ text }: TextProps) {
  return (
    <div className={styles.text}>
      <p>{text}</p>
    </div>
  );
}
