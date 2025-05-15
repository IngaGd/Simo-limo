import { useContext, useEffect } from "react";
import styles from "./home.module.scss";
import { Product } from "src/common/components/Product";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { useHandleProductList } from "src/common/hooks/useHandleProductList";
import { Notification } from "src/common/components/Notification/Notification";
import { useElementPositionInView } from "src/common/hooks/useElementPositionInView";
import { Popup } from "src/common/components/Popup/Popup";
import { useScrollY } from "src/common/hooks/useScrollY";
import { getGroupedProducts } from "./home.logic.ts";
import { Loader } from "src/common/components/Loader/Loader.tsx";
import { useTrackVisiting } from "src/common/hooks/useTrackVisiting.ts";

export default function Home() {
  const { loader } = useHandleProductList();
  const {
    products,
    notification,
    setNotification,
    isVisible,
    setImageIsLoaded,
  } = useContext(GlobalContext) as GlobalContextType;
  const { ref, deviceHeight } = useElementPositionInView();
  const scrollY = useScrollY();
  useTrackVisiting();

  useEffect(() => {
    setNotification(null);
  }, [notification]);

  useEffect(() => {
    setImageIsLoaded(false);
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [isVisible]);

  if (loader) return <Loader />;

  const groupedProducts = getGroupedProducts(products);
  const obj = Object.entries(groupedProducts);

  return (
    <>
      {notification?.type === "error" ? (
        <Notification message={notification.message} size="line" type="error" />
      ) : (
        <div className={`${styles.home} ${styles.animated}`} ref={ref}>
          {obj?.map(([category, products]) =>
            !products?.[0] ? (
              <div key={category}></div>
            ) : (
              <div className={styles.box} key={category}>
                <Product product={products[0]} allProducts={products} />
              </div>
            )
          )}
        </div>
      )}
      {isVisible && <Popup height={deviceHeight} top={scrollY} />}
    </>
  );
}
