import { Link } from "react-router-dom";
import { IconCart, IconEnvelop, IconShop, IconEvent } from "components/Icon";
import { Logo } from "components/Logo";
import styles from "./header.module.scss";
import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

export function Header() {
  const { cartItems, imageToCart } = useContext(
    GlobalContext
  ) as GlobalContextType;

  const sumQuantities = cartItems.reduce((n, { quantity }) => n + quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <Link to="/shopping-places" className={styles.shop}>
          <IconShop size="medium" />
        </Link>
        <Link to="/contacts" className={styles.envelope}>
          <IconEnvelop size="medium" />
        </Link>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <Link
          to="/cart"
          className={`${styles.cart} ${imageToCart ? styles.animated : ""}`}
        >
          <div className={styles.counter}>
            <IconCart size="medium" />
            {cartItems.length > 0 && (
              <div className={styles.quantity}>
                <span className={styles.number}>{sumQuantities}</span>
              </div>
            )}
          </div>
        </Link>
        <Link to="/events" className={styles.event}>
          <IconEvent size="medium" />
        </Link>
        {/* <Link to="/login">Login</Link> */}
      </div>
      <p className={styles.slogan}>Skanus limonadas</p>
    </header>
  );
}
