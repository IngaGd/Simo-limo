import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import styles from "./popup.module.scss";
import { Link } from "react-router-dom";

type PopupProps = {
  height?: number;
  top?: number;
};

export function Popup({ height, top }: PopupProps) {
  const { isVisible, setIsVisible } = useContext(
    GlobalContext
  ) as GlobalContextType;

  return (
    <div
      className={`${styles.popup} ${!isVisible ? styles.hidden : ""}`}
      style={
        {
          "--top": `${top}px`,
          "--height": `${height}px`,
        } as React.CSSProperties
      }
    >
      <div className={styles.modal}>
        <p>Prekės krepšelyje</p>
        <div className={styles.btn}>
          <Link
            to="/cart"
            className={styles.link}
            onClick={() => setIsVisible(!isVisible)}
          >
            Eiti į krepšelį
          </Link>
          <div onClick={() => setIsVisible(!isVisible)}>Tęsti apsipirkimą</div>
        </div>
      </div>
    </div>
  );
}
