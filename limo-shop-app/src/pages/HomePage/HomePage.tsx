import styles from "./homePage.module.scss";
import { Product } from "src/common/components/Product";
import { productList } from "../../assets/mok-data/productList";

export function HomePage() {
  return (
    <div className={styles.home}>
      {productList?.map((p) => (
        <div className={styles.box} key={p.id}>
          <Product product={p} />
        </div>
      ))}
    </div>
  );
}
