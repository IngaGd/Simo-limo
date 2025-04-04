import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import styles from "./errorBanner.module.scss";

export function ErrorBanner() {
  const { notification } = useContext(GlobalContext) as GlobalContextType;
  return (
    <div className={styles.errorBanner}>
      {notification?.type === "error" ? notification.message : ""}
    </div>
  );
}
