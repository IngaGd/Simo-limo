import { Link } from "react-router-dom";
import styles from "./footer.module.scss";

const home = "Pagrindinis";
const terms = "Sąlygos";
const privacy = "Privatumo politika";
const contacts = "Kontaktai";

export function Footer() {
  return (
    <div className={`${styles.footer} ${styles.animated}`}>
      <Link to="/">{home}</Link>
      <Link to="/terms">{terms}</Link>
      <Link to="/privacy">{privacy}</Link>
      <Link to="/contacts">{contacts}</Link>
    </div>
  );
}
