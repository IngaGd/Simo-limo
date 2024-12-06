import { Link } from "react-router-dom";
import { IconCart, IconEnvelop } from "components/Icon";
import { Logo } from "components/Logo";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/contacts" className={styles.icon}>
        <IconEnvelop size="medium" />
      </Link>
      <Link to="/" className={styles.logo}>
        <Logo />
      </Link>
      <Link to="/cart" className={styles.icon}>
        <IconCart size="medium" />
      </Link>
    </header>
  );
}
