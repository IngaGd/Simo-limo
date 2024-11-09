import styles from "./productGroupTitle.module.scss";

const title = "Dešimtinė juodo serbento";

export default function ProductGroupTitle() {
  return <div className={styles.title}>{title}</div>;
}
