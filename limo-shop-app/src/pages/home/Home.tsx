import ProductGroupBox from "../../common/components/ProductGroupBox";
import WallPaper from "../../common/components/Wallpaper";
import styles from "./home.module.scss";

export default function Home() {
  const homeClass = `${styles.home}`;
  return (
    <>
      <div className={homeClass}>
        <WallPaper />
        <ProductGroupBox />
      </div>
    </>
  );
}
