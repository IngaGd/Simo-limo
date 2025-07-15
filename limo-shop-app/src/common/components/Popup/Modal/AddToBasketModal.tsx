import { useContext } from "react";
import styles from "./modal.module.scss";
import { Link } from "react-router-dom";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

export function AddToBasketModal() {
  const { isVisible, setIsVisible, setAddToCartModal } = useContext(
    GlobalContext
  ) as GlobalContextType;

  return (
    <div className={styles.modal}>
      <p>Prekės krepšelyje</p>
      <div className={styles.btn}>
        <Link
          to="/cart"
          className={styles.link}
          onClick={() => {
            setIsVisible(!isVisible);
            setAddToCartModal(false);
          }}
        >
          Eiti į krepšelį
        </Link>
        <div
          onClick={() => {
            setIsVisible(!isVisible);
            setAddToCartModal(false);
          }}
        >
          Tęsti apsipirkimą
        </div>
      </div>
    </div>
  );
}
