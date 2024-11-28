import { Link } from "react-router-dom";
import { IconCart, IconEnvelop } from "components/Icon";
import { Logo } from "components/Logo";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.container}>
      <Link to="/contacts">
        <IconEnvelop />
      </Link>
      <Link to="/">
        <Logo />
      </Link>
      <Link to="/cart">
        <IconCart />
      </Link>
    </header>
  );
}
