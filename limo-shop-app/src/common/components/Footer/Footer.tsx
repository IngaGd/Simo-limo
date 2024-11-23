import styles from "./footer.module.scss";

const text = "Sąlygos";

export function Footer() {
  return <div className={styles.container}>{text}</div>;
}
