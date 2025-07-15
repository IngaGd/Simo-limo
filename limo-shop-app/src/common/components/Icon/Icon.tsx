// import { PiEnvelopeThin, PiShoppingBagThin } from "react-icons/pi";
import { TiMail } from "react-icons/ti";
import { BsFillBasket2Fill } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { GiRotaryPhone } from "react-icons/gi";
import { BsFillEnvelopeAtFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { GoDash } from "react-icons/go";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";
import { IconProps } from "./icon.types";
import { FaRegCopy } from "react-icons/fa";
import { ImCheckboxChecked } from "react-icons/im";
import { FaShop } from "react-icons/fa6";
import { BsCalendar2EventFill } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";

import styles from "./icon.module.scss";

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

export function IconSuccess({ size }: IconProps) {
  return <FaCheckCircle className={`${styles.success} ${styles[`${size}`]}`} />;
}

export function IconError({ size }: IconProps) {
  return <IoMdAlert className={`${styles.error} ${styles[`${size}`]}`} />;
}

export function IconCopy({ size }: IconProps) {
  return <FaRegCopy className={`${styles.copy} ${styles[`${size}`]}`} />;
}

export function IconCopied({ size }: IconProps) {
  return (
    <ImCheckboxChecked className={`${styles.copied} ${styles[`${size}`]}`} />
  );
}

export function IconShop({ size }: IconProps) {
  return <FaShop className={`${styles.shop} ${styles[`${size}`]}`} />;
}

export function IconEvent({ size }: IconProps) {
  return (
    <BsCalendar2EventFill className={`${styles.event} ${styles[`${size}`]}`} />
  );
}

export function IconClose({ size }: IconProps) {
  return <IoCloseOutline className={`${styles.close} ${styles[`${size}`]}`} />;
}
