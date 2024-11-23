import { useState } from "react";
import { allAssets } from "../../../assets/assets";
import { DescriptionTableDropDown } from "./DescriptionTableDropDown";
import styles from "./productGroupBox.module.scss";
import { ProductGroupTitle } from "./ProductGroupTitle";

export function ProductGroupBox() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className={styles.product}
      onClick={() => setIsActive((isActive) => !isActive)}
    >
      <div className={styles.box}>
        <img src={allAssets[`limo`]} alt="" className={styles.img} />
      </div>
      <ProductGroupTitle />
      <DescriptionTableDropDown isActive={isActive} />
    </div>
  );
}
