import { PiEnvelopeThin, PiShoppingCartSimpleThin } from "react-icons/pi";
import styles from "./icon.module.scss";

export function IconEnvelop() {
  return (
    <div className={styles.containerLeft}>
      <PiEnvelopeThin className={styles.size} />
    </div>
  );
}

export function IconCart() {
  return (
    <div className={styles.containerRight}>
      <PiShoppingCartSimpleThin className={styles.size} />
    </div>
  );
}
