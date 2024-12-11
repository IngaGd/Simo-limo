import { ContainerProps } from "./container.types";
import styles from "./container.module.scss";

export function Container({
  children,
  containerType,
  handleClick,
}: ContainerProps) {
  const containerClass = `${styles[`${containerType}`]}`;
  return (
    <div className={containerClass} onClick={handleClick}>
      {children}
    </div>
  );
}
