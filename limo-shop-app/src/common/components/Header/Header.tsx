import { Link } from "react-router-dom";
import { IconCart, IconEnvelop } from "components/Icon";
import { Logo } from "components/Logo";
import styles from "./header.module.scss";
import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

export function Header() {
  const { cartItems } = useContext(GlobalContext) as GlobalContextType;

  const sumQuantities = cartItems.reduce((n, { quantity }) => n + quantity, 0);

  return (
    <header className={styles.header}>
      <Link to="/contacts" className={styles.icon}>
        <IconEnvelop size="large" />
      </Link>
      <Link to="/" className={styles.logo}>
        <Logo />
      </Link>
      <Link to="/cart" className={styles.icon}>
        <div className={styles.counter}>
          <IconCart size="medium" />
          {cartItems.length > 0 && (
            <div className={styles.quantity}>
              <span className={styles.number}>{sumQuantities}</span>
            </div>
          )}
        </div>
      </Link>
    </header>
  );
}
