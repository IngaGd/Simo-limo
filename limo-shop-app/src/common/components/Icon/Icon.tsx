// import { PiEnvelopeThin, PiShoppingBagThin } from "react-icons/pi";
import { TiMail } from "react-icons/ti";
import { BsFillBasket2Fill } from "react-icons/bs";
import styles from "./icon.module.scss";
import { IconProps } from "./icon.types";

export function IconEnvelop({ size }: IconProps) {
  return <TiMail className={`${styles.envelope} ${styles[`${size}`]}`} />;
}

export function IconCart({ size }: IconProps) {
  return <BsFillBasket2Fill className={`${styles.bag} ${styles[`${size}`]}`} />;
}
