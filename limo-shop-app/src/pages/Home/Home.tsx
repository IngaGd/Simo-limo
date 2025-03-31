import { Suspense, useContext } from "react";
import styles from "./home.module.scss";
import { Product } from "src/common/components/Product";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { Loader } from "src/common/components/Loader/Loader";

export default function Home() {
  const { products } = useContext(GlobalContext) as GlobalContextType;

  return (
    <Suspense fallback={<Loader />}>
      <div className={styles.home}>
        {products?.map((p) => (
          <div className={styles.box} key={p.id}>
            <Product product={p} />
          </div>
        ))}
      </div>
    </Suspense>
  );
}
