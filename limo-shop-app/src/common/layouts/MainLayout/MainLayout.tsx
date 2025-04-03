import { Outlet } from "react-router-dom";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import styles from "./mainLayout.module.scss";
import { Suspense, useContext, useEffect } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import useDateCountDown from "src/common/hooks/useDateCountDown";
import { Text } from "src/common/components/Text";

export function MainLayout() {
  const { products } = useContext(GlobalContext) as GlobalContextType;
  const { days, hours, minutes, seconds } = useDateCountDown();

  useEffect(() => {
    if (!products || products.length === 0) return;
    products.forEach((p) => {
      const img = new Image();
      img.src = p.imagePath;
    });
  }, [products]);

  const text = `Testinė puslapio versija, limonadai jau yra! Gali nusipirkit iš manęs
          tiesiai užpildęs formą kontaktuose, ar IG. Taip pat gali atsiųsti
          komentarus puslapiui. E-parduotuvė startuoja už:`;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.countdown}>
        <Text text={text} />
        <div className={styles.date}>
          <div>{days} d</div>
          <div>{hours} h</div>
          <div>{minutes} m</div>
          <div>{seconds} s</div>
        </div>
      </div>
      <Suspense fallback={null}>
        <Outlet />
        <Footer />
      </Suspense>
    </div>
  );
}
