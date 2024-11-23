import styles from "./productGroupTitle.module.scss";

const title = "Dešimtinė juodo serbento";

export function ProductGroupTitle() {
  return <div className={styles.title}>{title}</div>;
}
