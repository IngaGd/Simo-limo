import DealGroupBox from "../../common/components/DealGroupBox";
import ProductGroupBox from "../../common/components/ProductGroupBox";
import styles from "./home.module.scss";

export default function Home() {
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
