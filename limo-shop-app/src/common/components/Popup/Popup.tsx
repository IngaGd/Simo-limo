import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import styles from "./popup.module.scss";
import { AddToBasketModal } from "./Modal/AddToBasketModal";
import { EmailModal } from "./Modal/EmailModal";

type PopupProps = {
  height?: number;
  top?: number;
};

export function Popup({ height, top }: PopupProps) {
  const { isVisible, emailModal, addToCartModal } = useContext(
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
      {addToCartModal && <AddToBasketModal />}
      {emailModal && <EmailModal />}
    </div>
  );
}
