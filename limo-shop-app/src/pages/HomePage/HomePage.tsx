import styles from "./homePage.module.scss";
import { Product } from "src/common/components/Product";
import { useHandleProductList } from "src/common/hooks/useHandleProductList";

export function HomePage() {
  const { products } = useHandleProductList();

  return (
    <div className={styles.home}>
      {products?.map((p) => (
        <div className={styles.box} key={p.id}>
          <Product product={p} />
        </div>
      ))}
    </div>
  );
}
