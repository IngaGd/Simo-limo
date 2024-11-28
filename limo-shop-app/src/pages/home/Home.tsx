//import { DealGroupBox } from "components/DealGroupBox";
import { ProductGroupBox } from "components/ProductGroupBox";
import styles from "./home.module.scss";
import { DealGroupBox } from "components/DealGroupBox";

export function Home() {
  const homeClass = `${styles.home}`;

  return (
    <>
      <div className={homeClass}>
        <div className={styles.box}>
          <ProductGroupBox />
        </div>
        <div className={styles.box}>
          <DealGroupBox />
        </div>
      </div>
    </>
  );
}
