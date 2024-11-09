import { allAssets } from "../../../assets/assets";
import styles from "./productGroupBox.module.scss";

export default function ProductGroupBox() {
  const productGroupClass = `${styles.product}`;
  return (
    <div className={productGroupClass}>
      <img src={allAssets[`limo`]} alt="" className={styles.img} />
    </div>
  );
}
