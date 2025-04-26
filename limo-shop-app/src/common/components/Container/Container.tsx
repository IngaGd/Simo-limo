import { ContainerProps } from "./container.types";
import styles from "./container.module.scss";
import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

export function Container({
  children,
  containerType,
  handleClick,
}: ContainerProps) {
  const { imageIsLoaded } = useContext(GlobalContext) as GlobalContextType;
  const containerClass = `${styles[`${containerType}`]}  ${
    imageIsLoaded ? styles.visible : ""
  }`;

  return (
    <div className={containerClass} onClick={handleClick}>
      {children}
    </div>
  );
}
