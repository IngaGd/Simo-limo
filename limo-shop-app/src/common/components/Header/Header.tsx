import { IconCart, IconEnvelop } from "../Icon/Icon";
import { Logo } from "components/Logo";
import styles from "./header.module.scss";

export function Header() {
  return (
    <header className={styles.container}>
      <IconEnvelop />
      <Logo />
      <IconCart />
    </header>
  );
}
