import styles from "./title.module.scss";
import { TitleProps } from "./title.types";

export function Title({ titleType, title, titleSize, children }: TitleProps) {
  const titleClass = `${styles[`${titleType}`]} ${styles[`${titleSize}`]}`;

  return (
    <div className={`${titleClass} ${titleSize}`}>
      <div className={styles.title}>{title}</div>
      <div className={styles.children}>{children}</div>
    </div>
  );
}
