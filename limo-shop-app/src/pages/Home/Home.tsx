import { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./home.module.scss";
import { Product } from "src/common/components/Product";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { useHandleProductList } from "src/common/hooks/useHandleProductList";
import { ErrorBanner } from "src/pages/ErrorBanner/ErrorBanner";

export default function Home() {
  useHandleProductList();
  const { products, error, setFooterIsVisible } = useContext(
    GlobalContext
  ) as GlobalContextType;
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        setFooterIsVisible(true);
      }, 2000);
    }
  }, [inView]);

  return (
    <>
      {error ? (
        <ErrorBanner />
      ) : (
        <div className={`${styles.home} ${styles.animated}`} ref={ref}>
          {products?.map((p) => (
            <div className={styles.box} key={p.id}>
              <Product product={p} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
