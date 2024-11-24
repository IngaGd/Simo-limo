import { useState } from "react";
import { allAssets } from "src/assets";
import { DescriptionTableDropDown } from "./DescriptionTableDropDown";
import styles from "./productGroupBox.module.scss";
import { ProductGroupTitle } from "./ProductGroupTitle";

export function DealGroupBox() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className={styles.product}
      onClick={() => setIsActive((isActive) => !isActive)}
    >
      <div className={styles.box}>
        <img src={allAssets[`drop`]} alt="" className={styles.img} />
      </div>
      <ProductGroupTitle />
      <DescriptionTableDropDown isActive={isActive} />
    </div>
  );
}
