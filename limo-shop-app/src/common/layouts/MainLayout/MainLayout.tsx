import { Outlet } from "react-router-dom";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import styles from "./mainLayout.module.scss";
import { Suspense, useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

export function MainLayout() {
  const { footerIsVisible } = useContext(GlobalContext) as GlobalContextType;

  return (
    <div className={styles.container}>
      <Header />
      <Suspense fallback={null}>
        <Outlet />
        {footerIsVisible && <Footer />}
      </Suspense>
    </div>
  );
}
