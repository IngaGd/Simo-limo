import { PiEnvelopeThin, PiShoppingBagThin } from "react-icons/pi";
import styles from "./icon.module.scss";
import { IconProps } from "./icon.types";

export function IconEnvelop({ size }: IconProps) {
  return (
    <PiEnvelopeThin className={`${styles.envelope} ${styles[`${size}`]}`} />
  );
}

export function IconCart({ size }: IconProps) {
  return <PiShoppingBagThin className={`${styles.bag} ${styles[`${size}`]}`} />;
}
