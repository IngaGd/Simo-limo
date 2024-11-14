import {
  PiEnvelopeThin,
  PiShoppingCartSimpleThin,
  PiDotsThreeOutlineThin,
} from "react-icons/pi";
import styles from "./icon.module.scss";

export function IconEnvelop() {
  return (
    <div className={styles.envelop}>
      <PiEnvelopeThin className={styles.size} />
    </div>
  );
}

export function IconCart() {
  return (
    <div className={styles.cart}>
      <PiShoppingCartSimpleThin className={styles.size} />
    </div>
  );
}

export function IconThreeDots() {
  return (
    <div>
      <PiDotsThreeOutlineThin className={styles.dots} />
    </div>
  );
}
