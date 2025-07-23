import { useContext, useEffect, useState } from "react";
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
    isVisible,
    setIsVisible,
    setEmailModal,
    setImageIsLoaded,
  } = useContext(GlobalContext) as GlobalContextType;
  const [popupShown, setPopupShown] = useState(() => {
    const isPopupShown = sessionStorage.getItem("popupShown");
    return isPopupShown ? JSON.parse(isPopupShown) : false;
  });
  const [isSubscribed, setIsSubscribed] = useState(() => {
    const subscription = localStorage.getItem("isSubscribed");
    return subscription ? JSON.parse(subscription) : false;
  });
  const { ref, deviceHeight } = useElementPositionInView();
  const scrollY = useScrollY();
  useTrackVisiting();

  useEffect(() => {
    if (popupShown || isSubscribed) return;
    setImageIsLoaded(false);
    const timeoutId = setTimeout(() => {
      setIsVisible(true);
      setEmailModal(true);
      setPopupShown(true);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("popupShown", JSON.stringify(popupShown));
    localStorage.setItem("isSubscribed", JSON.stringify(isSubscribed));
    if (notification?.subscription) {
      setIsSubscribed(true);
    }
  }, [popupShown, isSubscribed, notification]);

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
