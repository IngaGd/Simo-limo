import { allAssets } from "src/assets";
import styles from "./logo.module.scss";

export function Logo() {
  return (
    <div className={styles.container}>
      <img src={allAssets[`logoTransparent`]} alt="" className={styles.logo} />
    </div>
  );
}
