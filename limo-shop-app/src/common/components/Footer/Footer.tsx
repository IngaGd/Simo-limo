import styles from "./footer.module.scss";

const text = "Sąlygos";

export default function Footer() {
  return <div className={styles.container}>{text}</div>;
}
