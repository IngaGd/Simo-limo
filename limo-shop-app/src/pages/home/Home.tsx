import ProductGroupBox from "../../common/components/ProductGroupBox";
import styles from "./home.module.scss";

export default function Home() {
  const homeClass = `${styles.home}`;

  return (
    <>
      <div className={homeClass}>
        <ProductGroupBox />
      </div>
    </>
  );
}
