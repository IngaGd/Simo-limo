import { Outlet } from "react-router-dom";
import { Header } from "components/Header";
import { Footer } from "components/Footer";
import styles from "./mainLayout.module.scss";
import { Suspense } from "react";
// import { GlobalContext } from "src/common/context/GlobalContext";
// import { GlobalContextType } from "src/common/context/globalContext.types";
import useDateCountDown from "src/common/hooks/useDateCountDown";
import { ScrollToTop } from "src/common/components/ScrollToTop/ScrollToTop";

export function MainLayout() {
  // const { products } = useContext(GlobalContext) as GlobalContextType;
  const { days, hours, minutes, seconds } = useDateCountDown();

  // useEffect(() => {
  //   if (!products || products.length === 0) return;
  //   products.forEach((p) => {
  //     const img = new Image();
  //     img.src = p.imagePath;
  //   });
  // }, [products]);

  //   const text = `Užsukai į <b>testinę</b> simo.limo puslapio versiją. Limonado jau yra.
  // Nori atsigerti? Parašyk man - forma kontaktuose, arba numesk žinutę
  // IG. E-parduotuvė dar fermentuojasi, iki atidarymo liko:`;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.countdown}>
        <p>
          Užsukai į <b>testinę</b> simo.limo puslapio versiją. Limonado jau yra.
          Nori atsigerti? Parašyk man - forma kontaktuose, arba numesk žinutę
          IG. E-parduotuvė dar fermentuojasi, iki atidarymo liko:
        </p>
        <div className={styles.date}>
          <div>{days} d</div>
          <div>{hours} h</div>
          <div>{minutes} m</div>
          <div>{seconds} s</div>
        </div>
      </div>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Outlet />
        <Footer />
      </Suspense>
    </div>
  );
}
