// import { PiEnvelopeThin, PiShoppingBagThin } from "react-icons/pi";
import { TiMail } from "react-icons/ti";
import { BsFillBasket2Fill } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { GiRotaryPhone } from "react-icons/gi";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { GoDash } from "react-icons/go";
import styles from "./icon.module.scss";
import { IconProps } from "./icon.types";

export function IconEnvelop({ size }: IconProps) {
  return <TiMail className={`${styles.envelope} ${styles[`${size}`]}`} />;
}

export function IconCart({ size }: IconProps) {
  return (
    <BsFillBasket2Fill className={`${styles.cart} ${styles[`${size}`]}`} />
  );
}

export function IconInstagram({ size }: IconProps) {
  return (
    <FaInstagramSquare className={`${styles.instagram} ${styles[`${size}`]}`} />
  );
}

export function IconPhone({ size }: IconProps) {
  return <GiRotaryPhone className={`${styles.phone} ${styles[`${size}`]}`} />;
}

export function IconEmail({ size }: IconProps) {
  return (
    <BsFillEnvelopeAtFill className={`${styles.email} ${styles[`${size}`]}`} />
  );
}

export function IconPlus({ size }: IconProps) {
  return <GoPlus className={`${styles.plus} ${styles[`${size}`]}`} />;
}

export function IconMinus({ size }: IconProps) {
  return <GoDash className={`${styles.minus} ${styles[`${size}`]}`} />;
}
