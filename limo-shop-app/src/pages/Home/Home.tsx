import { useContext, useEffect } from "react";
// import { useInView } from "react-intersection-observer";
import styles from "./home.module.scss";
import { Product } from "src/common/components/Product";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { useHandleProductList } from "src/common/hooks/useHandleProductList";
import { Notification } from "src/common/components/Notification/Notification";

export default function Home() {
  useHandleProductList();
  const { products, notification, setNotification } = useContext(
    GlobalContext
  ) as GlobalContextType;
  // const { ref, inView } = useInView({
  //   threshold: 0.2,
  // });

  // useEffect(() => {
  //   if (inView) {
  //     setTimeout(() => {
  //       setFooterIsVisible(true);
  //     }, 2000);
  //   }
  // }, [inView]);

  useEffect(() => {
    setNotification(null);
  }, [notification]);

  return (
    <>
      {notification?.type === "error" ? (
        <Notification message={notification.message} size="line" type="error" />
      ) : (
        <div className={`${styles.home} ${styles.animated}`}>
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
