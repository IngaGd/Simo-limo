import { useContext } from "react";
import styles from "./homePage.module.scss";
import { Product } from "src/common/components/Product";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

export function HomePage() {
  const { products } = useContext(GlobalContext) as GlobalContextType;

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
