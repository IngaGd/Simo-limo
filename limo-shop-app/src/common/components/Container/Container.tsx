import { ContainerProps } from "./container.types";
import styles from "./container.module.scss";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { useContext } from "react";

export function Container({
  children,
  containerType,
  handleClick,
}: ContainerProps) {
  const { imageIsLoaded } = useContext(GlobalContext) as GlobalContextType;
  const containerClass = imageIsLoaded
    ? `${styles[`${containerType}`]} ${styles.visible}`
    : `${styles[`${containerType}`]} ${styles.hidden}`;

  return (
    <div className={containerClass} onClick={handleClick}>
      {children}
    </div>
  );
}
