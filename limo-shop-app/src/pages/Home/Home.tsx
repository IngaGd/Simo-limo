import { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./home.module.scss";
import { Product } from "src/common/components/Product";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

export default function Home() {
  const { products, setFooterIsVisible } = useContext(
    GlobalContext
  ) as GlobalContextType;
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setFooterIsVisible(true);
      }, 1000);
    }
  }, [inView]);

  return (
    <div className={`${styles.home} ${styles.animated}`} ref={ref}>
      {products?.map((p) => (
        <div className={styles.box} key={p.id}>
          <Product product={p} />
        </div>
      ))}
    </div>
  );
}
