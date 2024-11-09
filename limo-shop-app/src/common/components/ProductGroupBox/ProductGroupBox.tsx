import { allAssets } from "../../../assets/assets";
import styles from "./productGroupBox.module.scss";
import ProductGroupTitle from "./ProductGroupTitle";

export default function ProductGroupBox() {
  return (
    <div className={styles.product}>
      <div className={styles.box}>
        <img src={allAssets[`limo`]} alt="" className={styles.img} />
      </div>
      <ProductGroupTitle />
    </div>
  );
}
