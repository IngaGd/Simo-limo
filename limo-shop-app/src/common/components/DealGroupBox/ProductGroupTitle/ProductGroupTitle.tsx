import styles from "./productGroupTitle.module.scss";

const title = "Mėnesio pasiūlymas";

export default function ProductGroupTitle() {
  return <div className={styles.title}>{title}</div>;
}
