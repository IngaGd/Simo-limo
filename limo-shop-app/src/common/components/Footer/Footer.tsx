import { Link } from "react-router-dom";
import styles from "./footer.module.scss";

const home = "Pagrindinis";
const terms = "Sąlygos";
const privacy = "Privatumo politika";

export function Footer() {
  return (
    <div className={styles.footer}>
      <Link to="/">{home}</Link>
      <Link to="/terms">{terms}</Link>
      <Link to="/privacy">{privacy}</Link>
    </div>
  );
}
