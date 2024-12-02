import { Link } from "react-router-dom";
import styles from "./footer.module.scss";

const text = "Sąlygos";

export function Footer() {
  return (
    <div className={styles.footer}>
      <Link to="/terms">{text}</Link>
    </div>
  );
}
