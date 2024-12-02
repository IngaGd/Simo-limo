import { Outlet } from "react-router-dom";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import styles from "./mainLayout.module.scss";

export function MainLayout() {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
