import { useContext, useEffect, useState } from "react";
// import { useInView } from "react-intersection-observer";
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

export default function Home() {
  useHandleProductList();
  const { products, notification, setNotification, isVisible } = useContext(
    GlobalContext
  ) as GlobalContextType;
  const groupedProducts = getGroupedProducts(products);
  const { ref, deviceHeight } = useElementPositionInView();
  // const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);
  const scrollY = useScrollY();

  useEffect(() => {
    setNotification(null);
  }, [notification]);

  useEffect(() => {
    if (isVisible) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [isVisible]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setDeviceHeight(window.innerHeight);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    console.log("deviceHeight: ", deviceHeight);
  }, [deviceHeight]);

  // useEffect(() => {
  //   const handleChange = (event: Event) => {
  //     const orientation = event.target as ScreenOrientation;
  //     console.log(orientation.type, orientation.angle);
  //   };
  //   screen.orientation.addEventListener("change", handleChange);
  //   return () => screen.orientation.removeEventListener("change", handleChange);
  // }, []);

  useEffect(() => {});

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
